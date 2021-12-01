---
id: owncast-setup
title: Setup

---

#### Prerequisites

A computer that’s on the public internet to run it on. While crunching through video and serving it to viewers can be intensive from the computing side, you can get away with pretty meager resources on a simple setup. If you don’t already have a server to run it on you can get a Linode instance for $5/mo that runs it fine. If you worry that you’ll be maxing out the bandwidth or transfer limits allotted to you, then utilize a service like Media Network to serve the files instead.

Here are some hosting providers people have been successful with.

[Njala](https://njal.la/) (privacy focused)<br/>
[DigitalOcean](https://www.digitalocean.com) <br/>
[Hetzner](https://www.hetzner.com) <br/>
[Linode](https://www.linode.com)<br/>

A Unix OS (Debian 10 preferable) is recommended.

#### Install tools

```bash
apt install -y curl unzip htop bmon
```

#### Installing Owncast

Paste the following into your shell and the installer will download the most recent version of Owncast for your platform. It will also download a copy of ffmpeg if you don’t currently have one installed.

```bash
curl -s https://owncast.online/install.sh | bash
```

```bash
root@owncast:~# curl -s https://owncast.online/install.sh | bash
Owncast Installer v0.0.7 

Created directory  [✓]
Downloaded Owncast v0.0.7 for linux  [✓]  
Downloaded ffmpeg because it was not found on your system [✓]

Success! Run owncast by changing to the owncast directory and run ./owncast.
The default port is 8080 and the default streaming key is abc123.
Visit https://owncast.online/docs/configuration/ to learn how to configure your new Owncast server.
```

#### Running the instance

```bash
root@owncast:~# cd owncast/
root@owncast:~/owncast# ./owncast &
INFO[2021-06-08T00:50:48Z] Owncast v0.0.7-linux-64bit (3810ce4f63ecf7fb7a35c564af68f081c7e8b537) 
INFO[2021-06-08T00:50:48Z] Video transcoder started using x264 with 1 stream variants. 
INFO[2021-06-08T00:50:49Z] RTMP is accepting inbound streams on port 1935. 
INFO[2021-06-08T00:50:49Z] Web server is listening on port 8080.        
INFO[2021-06-08T00:50:49Z] The web admin interface is available at /admin. 
```

:::info
Your Owncast instance is ready! Just point your OBS or preffered broadcasting software to your IP and path:
:::

```bash
Server: rtmp://141.120.114.66/live/
Stream Key: abc123
URL to Watch: http://141.120.114.66:8080
Web Admin: (user: "admin" pass: "abc123") http://141.120.114.66:8080/admin
```

You can also use ffmpeg, for example let's restream an RT News feed:

```bash
ffmpeg -re -i http://rt-usa.secure.footprint.net/1105_4500Kb.m3u8 -c copy -bsf:a aac_adtstoasc -f flv rtmp://141.120.114.66/live/abc123
```

#### Monitoring bandwidth and hardware usage

You can use tools like `htop` and `bmon` to monitor both hardware resources and bandwidth consumption within the server / computer.


#### Owncast Installation - Quick Video Tutorial

<iframe src="https://player.vimeo.com/video/484707748" width="100%" height="400" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>

