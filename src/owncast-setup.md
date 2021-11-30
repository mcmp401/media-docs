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

#### Find out Owncast's port:

In this step you'll have to find out the details about your Owncast instance to be able to broadcast to it and also add it later on to Media Network.
Open a new You can check what is running in each port by executing the following command:

```bash
netstat -ntpl
```

```bash
root@owncast:~# netstat -ntpl
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name    
tcp        0      0 127.0.0.1:33257         0.0.0.0:*               LISTEN      1292/./owncast      
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      600/sshd            
tcp6       0      0 :::1935                 :::*                    LISTEN      1292/./owncast      
tcp6       0      0 :::8080                 :::*                    LISTEN      1292/./owncast      
tcp6       0      0 :::22                   :::*                    LISTEN      600/sshd  
```

Owncast is running on port ***8080*** for HTTP and ***1935*** for incoming RTMP streams, both under PID ***1292***

#### Find out external IP address of your device:

```bash
ifconfig
```

```bash
eno1: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 141.120.114.66  netmask 255.255.255.0  broadcast 141.120.114.66
        inet6 fe80::2eea:7fff:fef0:f2fe  prefixlen 64  scopeid 0x20<link>
        ether 2c:ea:7f:f0:f2:fe  txqueuelen 1000  (Ethernet)
        RX packets 9245489  bytes 1915123059 (1.7 GiB)
        RX errors 0  dropped 34  overruns 0  frame 0
        TX packets 4943558  bytes 970078005 (925.1 MiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
        device interrupt 49  

```

The external IP address is ***141.120.114.66*** using the ***eno1*** interface.

This means your Owncast instance is running at the following URL, which is what we'll need to add as a CDN resource:

```bash
http://141.120.114.66:8080
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

#### Quick install tutorial

<iframe src="https://player.vimeo.com/video/484707748" width="100%" height="600" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>

