import subprocess
import os
import sys

def start_server():
    backend_dir = os.path.join(os.getcwd(), "skin_termo_backend")
    
    if not os.path.exists(backend_dir):
        print(f"Error: Could not find {backend_dir}")
        return

    print(f"Starting SkinTermo Backend from {backend_dir}...")
    
    # Run uvicorn from the backend directory
    try:
        subprocess.run(
            [sys.executable, "-m", "uvicorn", "main:app", "--reload", "--host", "0.0.0.0", "--port", "8000"],
            cwd=backend_dir,
            check=True
        )
    except KeyboardInterrupt:
        print("\nStopping server...")
    except Exception as e:
        print(f"Error starting server: {e}")

if __name__ == "__main__":
    start_server()
