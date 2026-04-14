# How to Generate an SSH Key

SSH (Secure Shell) keys provide a secure, passwordless way to authenticate with remote servers, GitHub, and other services. This guide covers key generation on Windows, Linux, and macOS.

---

## Windows

### Option 1: OpenSSH (Built-in, Windows 11)

Windows 10 (version 1809+) and Windows 11 include OpenSSH natively.

#### Step 1 — Verify OpenSSH is installed

Open **PowerShell** or **Command Prompt** and run:

```powershell
ssh -V
```

You should see a version string like `OpenSSH_9.x`. If not, install it:

1. Open **Settings → Apps → Optional Features**
2. Click **Add a feature**
3. Search for **OpenSSH Client** and install it

#### Step 2 — Generate the key

```powershell
ssh-keygen -t ed25519 -C "your_email@example.com"
```

#### Step 3 — Follow the prompts

```
Generating public/private ed25519 key pair.
Enter file in which to save the key (C:\Users\YourName/.ssh/id_ed25519):
```

- Press **Enter** to accept the default location, or type a custom path.
- You can press **Enter** again for no password, or setup your own. It's your choice.

#### Step 4 — Start the SSH Agent

The SSH agent stores your decrypted key in memory so you don't retype the passphrase every time.

```powershell
# Run in PowerShell as Administrator
Set-Service -Name ssh-agent -StartupType Automatic
Start-Service ssh-agent

# Add your key
ssh-add $env:USERPROFILE\.ssh\id_ed25519
```

#### Step 5 — View your public key

```powershell
cat $env:USERPROFILE\.ssh\id_ed25519.pub
```

---

### Option 2: Git Bash

If you have **Git for Windows** installed, you can use Git Bash, which includes OpenSSH.

1. Open **Git Bash**
2. Follow the same commands as the [Linux/macOS section](#linux) below — they are identical in Git Bash.

---

## Linux

All major Linux distributions include OpenSSH by default.

### Step 1 — Verify or install OpenSSH

```bash
ssh -V
```

If not installed:

```bash
# Debian / Ubuntu
sudo apt update && sudo apt install openssh-client

# Fedora / RHEL
sudo dnf install openssh

# Arch Linux
sudo pacman -S openssh
```

### Step 2 — Generate the key

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

### Step 3 — Follow the prompts

```
Generating public/private ed25519 key pair.
Enter file in which to save the key (/home/yourname/.ssh/id_ed25519):
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
```

- Press **Enter** to use the default path (`~/.ssh/id_ed25519`)
- Enter a strong passphrase (recommended)

Your keys are saved to:
- `~/.ssh/id_ed25519` — private key
- `~/.ssh/id_ed25519.pub` — public key

### Step 4 — Add key to the SSH agent

```bash
# Start the agent (if not already running)
eval "$(ssh-agent -s)"

# Add your private key
ssh-add ~/.ssh/id_ed25519
```

To have the agent start automatically, add the `eval` line to your `~/.bashrc` or `~/.zshrc`.

### Step 5 — View your public key

```bash
cat ~/.ssh/id_ed25519.pub
```

---

## macOS

macOS includes OpenSSH and integrates with the system Keychain for passphrase storage.

### Step 1 — Open Terminal

Launch **Terminal** from Applications → Utilities, or press `Cmd + Space` and type "Terminal".

### Step 2 — Generate the key

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

### Step 3 — Follow the prompts

```
Generating public/private ed25519 key pair.
Enter file in which to save the key (/Users/yourname/.ssh/id_ed25519):
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
```

- Press **Enter** to use the default path
- Enter a passphrase (you can save it to Keychain in the next step)

### Step 4 — Add to SSH agent & macOS Keychain

macOS supports storing your passphrase in the system Keychain so you only enter it once.

```bash
# Start the SSH agent
eval "$(ssh-agent -s)"

# Add key and store passphrase in Keychain
ssh-add --apple-use-keychain ~/.ssh/id_ed25519
```

> On older macOS versions, use `-K` instead of `--apple-use-keychain`

To make this persist across reboots, add the following to `~/.ssh/config` (create the file if it doesn't exist):

```
Host *
  AddKeysToAgent yes
  UseKeychain yes
  IdentityFile ~/.ssh/id_ed25519
```

### Step 5 — View your public key

```bash
cat ~/.ssh/id_ed25519.pub
```

---

## After Generating Your Key

### Copy your public key to a remote server

```bash
ssh-copy-id user@your-server.com
```

Or manually append it:

```bash
cat ~/.ssh/id_ed25519.pub | ssh user@your-server.com "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
```

# Add to GitHub

1. Copy your public key contents:
   - **macOS/Linux:** `cat ~/.ssh/id_ed25519.pub | pbcopy` (macOS) or `xclip -sel clip < ~/.ssh/id_ed25519.pub` (Linux)
   - **Windows:** `cat $env:USERPROFILE\.ssh\id_ed25519.pub | clip`
   - Any way is fine, as long as you can view the public key in the file. Copy entire file contents.
2. Go to your account settings
3. SSH & GPG keys
3. Create your key name
4. Paste and save 
### Test your connection (GitHub example)

```bash
ssh -T git@github.com
# Hi username! You've successfully authenticated...
```

---

## Troubleshooting

### "Permission denied (publickey)"
- Ensure your public key is in the server's `~/.ssh/authorized_keys`
- Check file permissions: `chmod 700 ~/.ssh && chmod 600 ~/.ssh/authorized_keys`
- Verify the correct key is being used: `ssh -v user@host`

### "Could not open a connection to your authentication agent"
- Start the agent: `eval "$(ssh-agent -s)"`
- Then re-add your key: `ssh-add ~/.ssh/id_ed25519`

### Key not found / wrong default key
- Specify the key explicitly: `ssh -i ~/.ssh/my_custom_key user@host`
- Or set it in `~/.ssh/config`:
  ```
  Host myserver
    HostName your-server.com
    User username
    IdentityFile ~/.ssh/my_custom_key
  ```

### Windows: ssh-agent won't start
- Run PowerShell as Administrator and set: `Set-Service -Name ssh-agent -StartupType Automatic`