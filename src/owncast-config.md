---
id: owncast-config
title: Advanced Configuration
---

Configuration is done through the Owncast administration page located on your server under `/admin`. The login username is `admin` and the password is your stream key, the default being `abc123`.

Some common items many people would want to update after installing Owncast are:

- Your site name, logo, description and external links that are displayed on the website.
- The **stream key** to gain access to broadcasting to your stream and your admin.

#### Custom Ports

Per default, Owncast will run a `http` web server on port `8080` and a RTMP server on port `1935`. You can change the ports in the admin. You must restart Owncast for these changes to take effect.

You can also set the port for the web server on the command line via the `-webserverport` flag.

![Home Page](/img/owncast-server-settings.png)

#### Website details

Your site name, logo, description, and page content can be set in the admin. You can also add links to your social profiles and web sites that exist elsewhere. 

![Home Page](/img/owncast-general.png)

#### Video output

Depending on your hardware you may be able to configure your server to support multiple output variants for multiple different viewing conditions.

![Home Page](/img/owncast-variant.png)

#### Encoding

:::info
This document aims to outline what is being done to your content and the different knobs you can tweak to get the best output for your instance. Keep in mind it's hard to give specific settings that will give you the best quality and performance with Owncast because people have different servers and requirements.
:::

#### Overview

1. Configure your broadcasting software to send a stream to Owncast that is reasonably close to what you expect to send to your viewers. [How you configure your broadcasting software matters](#how-you-configure-your-broadcasting-software-matters). Don't tell OBS to send to Owncast at 7000k at 60fps if you only expect to support bitrates of 4000k and 2000k at 30fps.
1. Start with a single [output configuration](#things-you-can-configure) with average settings. Test it. See how your hardware handles it. If you want to, and are able to, then add another and test that. Repeat until you arrive at the configuration you want to offer your viewers and that your hardware can handle.
1. If your hardware can't handle your current configuration then reduce the number of output variants to only a single one, [reduce the quality of video you're sending to Owncast](#how-you-configure-your-broadcasting-software-matters), reduce your [framerate](#framerate), and reduce the [CPU usage](#cpu-usage)

#### Your stream can be played outside of your web site.

Because Owncast uses the HLS standard, almost any video player can play your stream. Quicktime, VLC, mpv, etc. You could even build your own app that plays it. You can access your stream directly on your server by putting the path of `/hls/stream.m3u8` into your player. For example: `https://owncast.mydomain.com/hls/stream.m3u8`.

#### How does an Owncast video stream work?

Owncast takes your source stream and converts it to short, individual video segments. A list of these segments is supplied to your viewer's player and will read and play all the segments in order. This is using a specification called [HLS](https://developer.apple.com/documentation/http_live_streaming/understanding_the_http_live_streaming_architecture) or HTTP Live Streaming. You can optionally generate multiple different qualities of video to allow lower bandwidth options. This is called [Adaptive bitrate streaming](https://en.wikipedia.org/wiki/Adaptive_bitrate_streaming).

In this case Owncast works as the Media encoder, Stream segmenter, and distribution web server. However Owncast supports video being distributed via 3rd party CDN's like Media Network, so in that case the video segments would be distributed from there, instead.

[ ![Video Config](/img/scheme.png) ](/img/scheme.png)

#### Things to keep in mind.

1. The more work you need done to convert the video from one size, quality or format to another the more it will slow everything else down.
1. The slower things go the slower the stream is provided to the user.
1. If stream is provided to the user too slowly they'll start seeing buffering and errors.

Here's what knobs can be tweaked when trying to determine the quality or qualities you want to provide your user while balancing the amount of server resources you're consuming.

### Things you can configure

#### Bitrate

The bitrate is the amount of data you send when you stream. A higher bitrate takes up more available internet bandwidth and create larger sized segments of video, making it take longer for viewers to download. Increasing your bitrate can improve your video quality, but only up to a certain point.

#### Resolution

Resolution refers to the size of a video on a screen. Like bitrates you can provide multiple different sizes for different cases, but asking to resize a video amounts in additional work that needs to be performed.

If you change both the width and the height, you may be changing the aspect ratio of the video and will end up with a squished picture if you don't set it correctly.

#### Framerate

Framerate is the number of frames per second in the video. Owncast defaults to 24fps, but other common framerates are 30 or 60. Increasing the framerate will use more CPU on your server, and more bandwidth for your users as more frames of video have to be processed and made available to your viewers any given second.

#### CPU Usage

The more CPU you use the better the output image will be, or the smaller of a file the output will be for the same quality. However, you will need to balance the amount of CPU you have available with the amount you can use to process video.

#### Latency Buffer

You have some control over the live latency between the broadcaster and the viewer. While it's completely understandable to want to have as little latency as possible you may need to increase the latency buffer if you're experiencing issues. In general the lower the latency the less buffer is available for any possible slow transfers, network blips or errors.

:::info
If you require real-time, video conferencing style latency you may want to look for a different solution that doesn't use HLS video, as this scaling and distribution model will never get to sub-second levels.
:::

#### Video Passthrough

:::tip
Turning on video passthrough may make your stream unplayable. Read about Video Passthrough before turning it on and learn about the risks involved.
:::

Owncast has an optional setting to turn off re-encoding of your inbound stream, potentially saving substantial hardware utilization and supporting a higher quality stream with less resources. **However**, because your video will not be re-encoded it's possible that certain video from certain sources may end up **not being playable at all**. This is the risk of enabling this.

To enable, visit the advanced settings for a specific stream output. You can turn on "Video Passthrough".

1. Turn it on if you require it.
1. Test it.
1. If your video won't play, **then turn it off**.
1. Only one output should be set as "passthrough".

If you find you require this feature, but it's not working for you, you _may_ be able to change to a different broadcasting client solution to send video to Owncast differently. For example, if you're using Restream, video passthrough will not work, but in general it's worked for people streaming from OBS.

#### Audio

What you're sending from your broadcasting software is generally reasonable and additional conversion isn't required, even for low-bandwidth viewers. Owncast will not change the audio stream and instead just pass it along to the end users to save additional work being performed.

#### How you configure your broadcasting software matters.

The more you send to Owncast, the more work it has do. This means you should generally not stream to Owncast at a significantly higher or lower quality than you expect to give to your viewers. It makes no sense to stream to Owncast at 6000k 60fps if you're telling Owncast to send to your viewers at 3000k 30fps, because your server has to do that conversion. On the other hand it makes no sense to stream to Owncast with a 1000k bitrate and then send to your viewers at 4000k, that would be wasted work and bandwidth.

So in short: Try to reasonably figure out what you want to stream to your users and match that as best as possible when setting up your broadcasting software.

If you find yourself trying to squeeze better performance out of Owncast then try setting your broadcasting software to a lower quality as well as lowering the quality in your Owncast instance.

#### CPU Usage

Each stream output variant adds significant CPU usage and slows down the overall generation of video segments. If you have a slow server running Owncast you should probably only have one bitrate variant in play. If you add more and you notice that playback becomes choppy it's likely that everything is running too slowly for consistent playback. Consider removing the additional variants and tweaking your single variant so it supports a wider variety of network conditions.

#### Disk Usage

More stream output variants requires more disk space, since it's another copy of the video on disk. If you're serving video locally and you have enough disk space then it's probably no big deal and files will rather quickly get rotated and cleaned up. If you're using something like Arweave for storage then files won't get cleaned up until some point in the future, so you'll have more remote storage use in play.

#### Hardware accelerated video encoding

If you are running on physical hardware you may be able to increase the performance of your Owncast instance by using your hardware along with a compatible codec, taking the heavy load off of your CPU. There is no guarantee all hardware configurations, drivers or operating systems will work and it may take some effort on your part to install all of the additional software required to get it working. 

#### Codecs

:::info
This should be viewed as an advanced topic that may require a substantial investment in time to get working. It may require downloading and compiling source code. It is highly recommended you configure and use your Owncast server without using alternate codecs first. Get Owncast working and improve performance later. 
:::
:::tip
It is unlikely that any specific support can be provided to help you, as it very much depends on the hardware you have and the software, drivers and versions of libraries you have installed. Outside of this document you are mostly on your own.
:::

#### Requirements

**All four of these things need to be true to support hardware accelerated encoding with Owncast.**

1. You are **not** running on a VPS provided to you by a hosting provider, as shared virtual servers do not allow for direct access to hardware.
1. You have compatible hardware and have direct access to it.
1. You installed and configured any drivers and libraries needed to take advantage of your hardware.
1. You have a copy of `ffmpeg` that is version 4.1.5 or greater that is specifically built to utilize these drivers and libraries.

#### Things to keep in mind

1. Most people won't be able to take advantage of this unless you're running your own hardware.
1. Just because a specific hardware accelerated codec shows in the Owncast admin **does not mean your machine is configured to support it**. It simply means Owncast believes that codec to be available.
1. Very little of what is required to get your hardware working has anything to do with Owncast. Any questions you have about your particular hardware should be directed to your hardware manufacturer or whoever provides the drivers and libraries to utilize it. There's likely a lot of information already online, so please do your research.

#### Compatible hardware

#### Intel Graphics

If you have Intel integrated graphics you may be able to use it using [VA-API](#va-api).

#### Raspberry Pi

If you have a recent Raspberry Pi and using the [Raspberry Pi OS](https://www.raspberrypi.org/documentation/installation/noobs.md) operating system it's actually quite easy to get Owncast running in a hardware accelerated fashion. Raspberry Pi OS includes support for [OpenMax](#openmax) (OMX) out of the box and includes a version of `ffmpeg` that is built to support it.

However, this seems to only be true for 32 bit operating systems on a Raspberry Pi, as [omx seems to be deprecated under 64 bit environments](https://github.com/raspberrypi/firmware/issues/1366#issuecomment-612902082).

#### NVIDIA GPUs

NVIDIA GPUs ship with an on-chip hardware encoder unit often referred to as NVENC. Separate from the CUDA cores, NVENC run encoding workloads without slowing the execution of graphics or CUDA workloads running at the same time.

As of July 2019 Kepler, Maxwell, Pascal, Volta and Turing generation GPUs support hardware encoding. Visit the [NVIDIA GPU Support Matrix](https://developer.nvidia.com/video-encode-and-decode-gpu-support-matrix-new#Encoder) to verify your GPU is listed in the "encoder" list.

#### AMD GPUs

[VA-API](#va-api) is supported on AMD and ATI GPUs by the [libva-mesa-driver](https://is.gd/ZvSdpo).

#### Compatible codecs/libraries

#### VA-API

VA-API (video acceleration API) is a layer to support hardware accelerated encoding on linux. You need the `libva` library installed for it to work. VA-API is not compatible with ARM chipsets.

Links:

- [VA-API at Linux Reviews](https://linuxreviews.org/VAAPI)
- [Intel Media Driver for VA-API](https://github.com/intel/media-driver/)

#### OpenMAX

OpenMAX is a unified abstraction layer that allows access to hardware that otherwise requires vendor specific APIs. It will work out of the box on modern Raspberry Pi's running a recent version of the [Raspberry Pi OS](https://www.raspberrypi.org/documentation/installation/noobs.md) operating system.

Verify your copy of ffmpeg has omx support by looking at the [ffmpeg](#ffmpeg) instructions below. If `h264_omx` is in the list you should be good to go.

#### NVIDIA Encoder (nvenc)

Follow the instructions on the [NVIDIA ffmpeg transcoding guide](https://developer.nvidia.com/blog/nvidia-ffmpeg-transcoding-guide/) to install all the required drivers and libraries. This requires installing a driver from the [NVIDIA website](https://www.nvidia.com/drivers), Downloading and install the [CUDA toolkit](https://developer.nvidia.com/cuda-toolkit), [downloading nv-codec-headers](https://github.com/FFmpeg/nv-codec-headers), and building ffmpeg. Scroll to the section entitled _Hardware accelerated transcoding with FFmpeg_ at the [NVIDIA transcoding guide](https://developer.nvidia.com/blog/nvidia-ffmpeg-transcoding-guide/) for more information.

You may be able to find a pre-built version of ffmpeg that has `nvenc` support, however that's outside the scope of this document. You still need NVIDIA drivers regardless.

Links:

- [Tal.org instructions on building ffmpeg with nvenc](https://www.tal.org/tutorials/ffmpeg_nvidia_encode)
- [Shell script that claims to automate the process on Ubuntu](https://gist.github.com/ransagy/3f6f1a9e5ede6212425f3b36b136216e)

#### ffmpeg

Once your system is configured to use the correct drivers and libraries required you'll need to make sure your copy of `ffmpeg` supports it.

Verify you have ffmpeg installed that's at least version 4.1.5.

```
$ ffmpeg -version
ffmpeg version 4.1.6-1~deb10u1+rpt1 Copyright (c) 2000-2020 the FFmpeg developers
built with gcc 8 (Raspbian 8.3.0-6+rpi1)
```

Verify the codec you expect to use is enabled in your version of ffmpeg.

```
$ ffmpeg -hide_banner -codecs | grep 264
 DEV.LS h264                 H.264 / AVC / MPEG-4 AVC / MPEG-4 part 10 (decoders: h264 h264_v4l2m2m h264_mmal ) (encoders: libx264 libx264rgb h264_omx h264_v4l2m2m h264_vaapi )
```

If the codec you hope to use is not in this list then you may need to build your own copy of ffmpeg that supports it.






