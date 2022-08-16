import { Player, Queue, QueueRepeatMode, Track } from "discord-player";
import { Client, Message, TextChannel, VoiceChannel } from "discord.js";

export interface Metadata {
    voiceChannel: VoiceChannel;
    textChannel: TextChannel;
}

class MusicManager {
    player: Player;

    constructor(client: Client) {
        this.player = new Player(client);
        this.player.on("trackStart", this.onPlay.bind(this));
        this.player.on("queueEnd", this.onEnd.bind(this));
        this.player.on("error", this.onError.bind(this));
        this.player.on("connectionError", this.onError.bind(this));
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onError(queue: Queue, _error: Error) {
        //please PLEASE for the love of fuck type ur shit properly
        const { textChannel } = queue.metadata as Metadata;

        textChannel.send("⚠ An error has occured and music can't be played.");

        //TODO: do smth with the error
    }

    onEnd(queue: Queue) {
        const { textChannel } = queue.metadata as Metadata;

        textChannel.send(
            "⛔ The queue ended and the bot has left the channel.",
        );
    }

    onPlay(queue: Queue, track: Track) {
        const { textChannel } = queue.metadata as Metadata;

        textChannel.send(`🎶 Now playing \`${track.title}\``);
    }

    async play(song: string, message: Message) {
        if (!message.guild) return; //eslint wont stfu
        if (!message.member?.voice.channel) return;
        if (message.member.voice.channel.type !== "GUILD_VOICE")
            return message.reply(
                "You can only use the bot inside regular voice channels.",
            );

        const queue =
            this.player.getQueue<Metadata>(message.guild) ??
            this.player.createQueue<Metadata>(message.guild, {
                metadata: {
                    voiceChannel: message.member.voice.channel,
                    textChannel: message.channel as TextChannel,
                },
            });

        try {
            if (!queue.connection)
                await queue.connect(message.member.voice.channel);
        } catch {
            queue?.destroy();
            return message.reply({
                content: "Could not join your voice channel!",
            });
        }

        if (queue.connection.channel !== message.member.voice.channel)
            await queue.connect(message.member.voice.channel);

        const track = await this.player
            .search(song, {
                requestedBy: message.author,
            })
            .then((x) => x.tracks[0]);

        if (!track) return message.reply(`❌ Could not find song \`${song}\`!`);

        queue.play(track);

        message.reply(
            `<a:loading:956254730324152350> Loading \`${track.title}\`!`,
        );
    }

    async stop(message: Message) {
        if (!message.guild) return; //eslint wont stfu
        if (!message.member?.voice.channel) return;
        if (message.member.voice.channel.type !== "GUILD_VOICE")
            return message.reply(
                "You can only use the bot inside regular voice channels.",
            );

        const queue = this.player.getQueue<Metadata>(message.guild);

        if (!queue?.connection) return message.reply("❌ Nothing is playing.");

        queue.destroy();

        message.reply(`✅ Stopped playing.`);
    }

    loop(type: QueueRepeatMode, message: Message) {
        if (!message.guild) return; //eslint wont stfu
        if (!message.member?.voice.channel) return;
        if (message.member.voice.channel.type !== "GUILD_VOICE")
            return message.reply(
                "You can only use the bot inside regular voice channels.",
            );

        const queue = this.player.getQueue<Metadata>(message.guild);

        if (!queue?.connection) return message.reply("❌ Nothing is playing.");

        queue.setRepeatMode(type);

        switch (type) {
            case QueueRepeatMode.OFF:
                return message.reply("👍 Not looping");
            case QueueRepeatMode.TRACK:
                return message.reply("👍 Looping the current song");
            case QueueRepeatMode.QUEUE:
                return message.reply("👍 Looping the entire queue");
            case QueueRepeatMode.AUTOPLAY:
                return message.reply("👍 Playing on YouTube:tm: autoplay");
        }
    }

    nowPlaying(message: Message) {
        if (!message.guild) return; //eslint wont stfu
        if (!message.member?.voice.channel) return;
        if (message.member.voice.channel.type !== "GUILD_VOICE")
            return message.reply(
                "You can only use the bot inside regular voice channels.",
            );

        const queue = this.player.getQueue<Metadata>(message.guild);

        if (!queue?.connection) return message.reply("❌ Nothing is playing.");

        const nowPlaying = queue.nowPlaying();

        message.reply(
            `🔷 Now playing: \`${nowPlaying.title}\` (<${nowPlaying.url}>) Requested by: \`${nowPlaying.requestedBy.tag}\``,
        );
    }
}

export default MusicManager;
