import ytdl from 'ytdl-core';
import ytsr from 'ytsr'; //This module is for youtube search
import Discord from 'discord.js';

import { Argument, Command } from './Parser';

const youtubeCommand = new Command([
  new Argument('required', ['play', 'p']),
  new Argument('long', ['A youtube video name or url to play']),
]);

interface searchResults {
  url: string;
  name: string;
}

class YoutubePlayer {
  connection: Discord.VoiceConnection;
  player: Discord.StreamDispatcher;
  searchOptions: ytsr.Options = { limit: 1, safeSearch: false, gl: 'TR' };

  async connect(channel: Discord.VoiceChannel): Promise<true | string> {
    if (channel !== null) {
      this.connection = await channel.join();
      return true;
    } else {
      return 'You have to join to a channel in order to play audio.';
    }
  }

  async search(videoName: string): Promise<searchResults> {
    const filters = await ytsr.getFilters(videoName, this.searchOptions);
    const filter = filters.get('Type').get('Video');
    const results: any = await ytsr(filter.url, this.searchOptions); //Currently the items property is bugged and doesnt let the usage of url property. So we set the type to any to trick typescript compiler.
    return { url: results.items[0].url, name: results.items[0].title };
  }

  async play(youtubelink: string): Promise<string> {
    this.player = this.connection.play(
      ytdl(youtubelink, { quality: 'highestaudio' }),
    );
    return '**Playing:** ' + youtubelink;
  }

  disconnect(): void {
    if (this.connection !== undefined) {
      this.connection.disconnect();
    }
  }

  stop(): void {
    if (this.connection !== undefined && this.player !== undefined) {
      this.player.end();
    }
  }
}

export { YoutubePlayer, youtubeCommand };
