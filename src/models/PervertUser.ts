import { Column, Entity, getRepository, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PervertUser {
  @PrimaryGeneratedColumn('increment')
  id: number; // Database id

  @Column({ type: 'text', unique: true })
  discordId: string; //Unique discord id

  @Column('varchar')
  mode: 'tts' | 'obama' | 'bruh' | string; //Bot plays sounds according to this variable

  @Column('text')
  data: string; //When mode is set to "tts", this column is the text tts processes

  static async createUser(
    discordId: string,
    mode: string,
    data: string,
  ): Promise<PervertUser> {
    const userRepo = getRepository(PervertUser);
    const listUser = await userRepo.find({ where: { discordId: discordId } }); //Looks if there is already an entity in for specified Discord id.
    if (listUser.length > 0) {
      // .length is used for failsafe purposes
      //If there is an existing entity in database
      const user = listUser[0];
      user.mode = mode;
      user.data = data;

      await userRepo.save(user);
      return user;
    } else {
      //If there is not an existing entity in database
      const user = new PervertUser();
      user.discordId = discordId;
      user.mode = mode;
      user.data = data;

      await userRepo.save(user);
      return user;
    }
  }

  static async removeUser(discordId: string): Promise<boolean> {
    const userRepo = getRepository(PervertUser);

    try {
      await userRepo.remove(
        await userRepo.find({ where: { discordId: discordId } }),
      );
      return true;
    } catch (error) {
      console.warn(error);
      return false;
    }
  }

  static async getUser(discordId: string): Promise<PervertUser[] | false> {
    const userRepo = getRepository(PervertUser);
    const user = await userRepo.find({ where: { discordId: discordId } });

    if (user.length > 0) {
      // If finds a user by discord id (lenght is for failsafe purposes)
      return user;
    } else {
      console.warn('No discord id has been found for:', discordId);
      return false;
    }
  }
}
