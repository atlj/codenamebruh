/* eslint-disable @typescript-eslint/no-var-requires */
import { VoiceChannel } from 'discord.js';
import { getVoiceStream } from 'discord-tts';

const TTEN = async (name: string, channel: VoiceChannel) => {
  const connection = await channel.join();
  const player = connection.play(getVoiceStream(name, 'tr-TR'));
  player.once('finish', async () => {
    player.end;
    const player2 = connection.play('../assets/audio/warde.mp3');
    player2.once('finish', () => {
      player2.end();
      connection.disconnect();
    });
  });
};

export default TTEN;
