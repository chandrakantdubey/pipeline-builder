1. **Create and use a virtual environment (Recommended)**:
```bash
# Install python3-venv if not already installed
sudo apt install python3-venv

# Create a virtual environment
python3 -m venv myenv

# Activate the virtual environment
source myenv/bin/activate

# Now install fastapi
pip install fastapi
```

2. **Use pipx** (for application installation):
```bash
# Install pipx if not already installed
sudo apt install pipx

# Install fastapi using pipx
pipx install fastapi
```

3. **Use system package manager** (if available):
```bash
sudo apt install python3-fastapi
```

4. **Override the restriction (Not Recommended)**:
```bash
pip install --break-system-packages fastapi
```

The recommended approach is using a virtual environment (option 1) because:
- It keeps your project dependencies isolated
- Prevents conflicts between different projects
- Doesn't affect your system Python installation
- Gives you more control over package versions

After creating and activating the virtual environment, you can install packages without the "externally-managed-environment" error.
