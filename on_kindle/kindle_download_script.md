# Kindle Download Script Setup

Prerequisites: Jailbroken Kindle with USBNetwork and KUAL installed.

## Option 1: SSH over WiFi (Recommended)

WiFi SSH is simpler and more reliable than USB networking.

### Enable WiFi SSH on Kindle

1. Connect your Kindle to your WiFi network
2. Open **KUAL** from the library
3. Go to **USBNetwork → Allow SSH over WiFi**
4. Go to **USBNetwork → Toggle USBNetwork** (to start SSH)

### Find Kindle's WiFi IP

On the Kindle, type in the search bar: `;711`

Look for the WiFi IP address (e.g., `192.168.2.53`)

### Connect

```bash
ssh root@192.168.2.53
```

The default password is empty (just press Enter) or `mario`.

---

## Option 2: SSH over USB

USB networking requires more setup but works without WiFi.

### Enable USB Network Mode

On the Kindle, type in the search bar: `;un`

This switches the Kindle from USB storage mode to USB network mode (it will no longer appear as a mounted drive).

### Configure Your Computer

#### macOS

1. Find the Kindle's network interface:

   ```bash
   ifconfig | grep -B5 "100baseTX"
   ```

   Look for the interface name (e.g., `en9`, `en6`, etc.)

2. Configure the interface (replace `en9` with your interface):

   ```bash
   sudo ifconfig en9 192.168.15.201 netmask 255.255.255.0 up
   ```

3. If you have conflicts with other interfaces:

   ```bash
   # Remove IP from any conflicting interface
   sudo ifconfig en6 delete 192.168.15.201
   # Flush ARP cache
   sudo arp -d 192.168.15.244
   # Reconfigure the correct interface
   sudo ifconfig en9 192.168.15.201 netmask 255.255.255.0 up
   ```

4. Test the connection:
   ```bash
   ping 192.168.15.244
   ```

#### Linux

```bash
sudo ifconfig usb0 192.168.15.201 netmask 255.255.255.0 up
ping 192.168.15.244
```

#### Windows

1. Open **Network Adapter Settings**
2. Find the Kindle/RNDIS network adapter
3. Set IPv4 properties:
   - IP Address: `192.168.15.201`
   - Subnet Mask: `255.255.255.0`

### Connect via USB SSH

```bash
ssh root@192.168.15.244
```

The default password is empty (just press Enter) or `mario`.

#### Troubleshooting (USB)

- **`ping 192.168.15.244` works but SSH says “Connection refused”**: USB networking is up, but the SSH daemon isn’t running. Use **KUAL → USBNetwork → Toggle USBNetwork** (or **Start/Restart SSHD** if present) to start it.
- **SSH asks for a password / won’t accept blank password**: In USB drive mode, edit `/mnt/us/usbnet/etc/config` (on your Mac this is `/Volumes/Kindle/usbnet/etc/config`) and set `USE_WIFI="false"` so Dropbear is started with the “nopasswd” flag when using USB.

---

Create the image-downloading script:

```
nano /mnt/us/script.sh
```

This will create an empty file for your script and open it for editing. In the editor, type the following, substituting in the URL to download your image (from step 2 above):

```
curl http://192.168.2.43:3001/ -o status.png
eips -c
eips -c
eips -g status.png
```

To save and exit the editor, type control-O, enter, and then control-X.

The first line there downloads your image and saves it to a file called “status.png”. eips is a program that comes with the Kindle for drawing to the screen. The first two eips commands clear the screen (twice for good measure - especially on older devices there can be some ghosting). The last line displays our image.

You can now test the script by running it like this /mnt/us/script.sh You should see the Kindle screen clear, and then a moment later your image will appear.

Set up a cron job

We’ll want the Kindle to automatically download the image and display it every minute. The Kindle’s OS, like other Linux-based operating systems, comes with cron, a tool for running tasks on a schedule. To use it, we just need to edit its configuration file:

nano /etc/crontab/root
Add this line to the bottom:

- - - - - /mnt/us/script.sh
          Again, to save and exit type ⌃O, enter, then ⌃X.

Finally, restart cron:

/etc/init.d/cron restart
If everything worked, you should see the image refresh on your Kindle screen every minute. You’re done! You can now unplug the Kindle from your computer.
