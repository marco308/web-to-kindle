# Kindle PaperWhite 3 (PW3) Jailbreak Guide

## Device Information
- **Model:** Kindle PaperWhite 3 (2015) WiFi (PW3)
- **Firmware:** 5.16.2.1.1
- **Jailbreak Method:** LanguageBreak

## Overview

LanguageBreak is a software jailbreak exploit that works on firmware versions **5.14.3 - 5.16.2.1.1**. Your firmware 5.16.2.1.1 is the final firmware for PW3, so you won't receive further updates that could break your jailbreak.

**Important Notes:**
- This method will **delete all content** on your Kindle - back up everything first
- Device must have **no password/PIN lock** enabled
- Keep Airplane Mode enabled throughout the process

---

## Prerequisites

Before starting, ensure you have:
- [ ] Your Kindle PaperWhite 3 charged (at least 50%)
- [ ] A computer with USB cable
- [ ] **All books and documents backed up** (this process wipes everything)
- [ ] No password/PIN lock on the device
- [ ] The LanguageBreak files downloaded

---

## Required Downloads

1. **LanguageBreak Package**
   - Download from: [GitHub - LanguageBreak](https://github.com/notmarek/LanguageBreak)
   - Contains the main jailbreak files and hotfix `.bin` files

2. **Post-Jailbreak Tools** (from [NiLuJe's Snapshots Thread](https://www.mobileread.com/forums/showthread.php?t=225030)):
   - JB Hotfix: `Update_jailbreak_hotfix_1.16.N_install.bin`
   - MRPI (MobileRead Package Installer)
   - KUAL Booklet (coplate variant)

---

## Step-by-Step Jailbreak Instructions

### Phase 1: Preparation

1. **Enable Airplane Mode** on your Kindle
2. **Remove any password/PIN lock** from your device
3. **Back up all content** - this process will delete everything
4. Connect your Kindle to your computer
5. Delete any `.bin` or `update.bin.tmp.partial` files from the root folder
6. Disconnect your Kindle

### Phase 2: Enter Demo Mode

1. On your Kindle's home screen, tap the **search bar**
2. Type: `;enter_demo`
3. Press Enter/Search
4. Your Kindle will reboot into Demo Mode setup
5. Complete the initial setup screens:
   - Skip WiFi setup (stay offline)
   - Fill in any required text fields with dummy data
   - Complete any selections required
6. Wait several minutes for Demo Mode to fully activate
7. When you reach the main screen, use a **two-finger swipe down** from the top to access the menu

### Phase 3: Initial File Transfer

1. On the Kindle, tap the search bar
2. Type: `;demo`
3. Select **"Sideload Content"** from the options
4. Connect your Kindle to your computer via USB
5. Extract the **LanguageBreak folder contents** to the root directory of your Kindle
6. Safely eject (do not disconnect yet - proceed to Phase 4)

### Phase 4: Critical Window Exploitation

**This step requires quick timing:**

1. Disconnect your Kindle from USB
2. Return to the Demo Configuration menu (`;demo` in search)
3. Select **"Resell Device"**
4. Confirm when prompted
5. **CRITICAL:** When you see the "Press power button" prompt, you have approximately **5 seconds**:
   - Immediately reconnect your Kindle to USB
6. Copy the **LanguageBreak folder contents** again to the root directory
7. The device will auto-eject after approximately 30 seconds - this is normal

### Phase 5: Trigger the Jailbreak

1. Wait for your Kindle to fully power off
2. Press the power button to turn it on
3. On the language selection screen, select: **简体中文** (Simplified Chinese)
4. Watch the **top-right corner** of the screen for log messages
5. The jailbreak is executing when you see text appearing

### Phase 6: Verify Success

After the process completes:
- Your Kindle should reboot
- You may see "Application Error" or debug messages
- The device should return to the normal setup screen

---

## Post-Jailbreak Setup

### Enable USB Storage Access

1. On your Kindle's search bar, type: `;uzb`
2. This enables USB access for file transfers

### Install the Hotfix

1. Connect your Kindle to your computer
2. From the LanguageBreak package, copy the appropriate hotfix file:
   - `Update_hotfix_languagebreak-*.bin` (choose the one matching your device)
3. Copy it to the **root** of your Kindle storage
4. Safely eject and disconnect
5. Go to **Settings > Menu > Update Your Kindle**

### Install JB Hotfix (Persistence)

1. Connect your Kindle to your computer
2. Copy `Update_jailbreak_hotfix_1.16.N_install.bin` to the root
3. Safely eject and disconnect
4. Go to **Settings > Menu > Update Your Kindle**

### Install MRPI

1. Connect your Kindle to your computer
2. Extract the MRPI package to the root of your Kindle
3. This creates an `mrpackages` folder
4. Safely eject and disconnect

### Install KUAL

1. Connect your Kindle to your computer
2. Copy `Update_KUALBooklet_*_install.bin` to the `mrpackages` folder
3. Safely eject and disconnect
4. In the search bar, type: `;log mrpi`
5. Wait for KUAL to install

### Verify Jailbreak Status

Type `;log` in the search bar. If you see text output, your jailbreak is working.

---

## Blocking OTA Updates

Since your firmware (5.16.2.1.1) is the **final version** for PW3, Amazon will not push further updates. However, for safety:

1. **Keep Airplane Mode enabled** when not downloading books
2. **Install Helper extension** from KUAL for additional protection
3. Install **renameotabin** package to disable update executables

---

## Installing USBNetwork (SSH Access)

USBNetwork allows you to SSH into your Kindle for advanced modifications and file management.

### Download

Get `kindle-usbnet-0.21.N.zip` from [NiLuJe's Snapshots Thread](https://www.mobileread.com/forums/showthread.php?t=225030)

### Install via MRPI

1. Connect Kindle to computer
2. Copy `Update_usbnet_0.21.N_install_pw2_kt2_kv_pw3.bin` to the `mrpackages` folder
3. Safely eject and disconnect
4. On Kindle, type `;log mrpi` in the search bar
5. Wait for installation to complete

### Enable USBNetwork

In the search bar, type: `;un`

This starts the SSH server at IP **192.168.15.244**

### Connecting via SSH

#### macOS
```bash
# Find your Kindle's interface name (usually en6 or similar)
ifconfig

# Configure the interface
sudo ifconfig en6 192.168.15.201

# Connect
ssh root@192.168.15.244
```

#### Linux
```bash
sudo ifconfig usb0 192.168.15.201
ssh root@192.168.15.244
```

#### Windows
1. Open **Network Adapter Settings**
2. Find the Kindle/RNDIS network adapter
3. Set IPv4 properties:
   - IP Address: `192.168.15.201`
   - Subnet Mask: `255.255.255.0`
4. Use PuTTY or Windows Terminal to connect:
   ```
   ssh root@192.168.15.244
   ```

**Password:** Press Enter (empty) or try `mario`

### Useful Search Bar Commands

| Command | Action |
|---------|--------|
| `;un` | Toggle USBNetwork on/off |
| `;711` | View network details |

### Enable WiFi SSH (Optional)

1. Open KUAL
2. Go to **USBNetwork > Allow SSH over WiFi**
3. Then **USBNetwork > Toggle USBNetwork**

Config file location: `/mnt/us/usbnet/etc/config`

---

## Troubleshooting

### Demo Mode won't activate
- Ensure you typed `;enter_demo` correctly (with semicolon)
- Try rebooting and entering the command again

### Missed the 5-second window
- Let the device complete the reset
- Start over from Phase 2

### No log messages appear when selecting Chinese
- The timing in Phase 4 may have been off
- Reset the device and try again from Phase 2

### `;uzb` doesn't work
- Try `;demo` and use Sideload Content instead
- Or try rebooting first

---

## Resources

- [LanguageBreak - GitHub](https://github.com/notmarek/LanguageBreak)
- [LanguageBreak Guide - Kindle Modding](https://kindlemodding.gitbook.io/kindlemodding/jailbreak-software/languagebreak-5.14.3-5.16.2.1.1)
- [NiLuJe's Snapshots Thread (Downloads)](https://www.mobileread.com/forums/showthread.php?t=225030)
- [Open Sesame! - Jailbreak Index](https://www.mobileread.com/forums/showthread.php?t=320564)
- [Kindle Modding Guide](https://kindlemodding.gitbook.io/kindlemodding/)

---

## Disclaimer

Jailbreaking your Kindle may void your warranty. This process will erase all content on your device. Proceed at your own risk. Always keep backups of your important data.

---

*Guide created: December 2024*
*Applicable for: Kindle PaperWhite 3 (2015) on Firmware 5.16.2.1.1*
