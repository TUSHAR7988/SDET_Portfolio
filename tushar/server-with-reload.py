#!/usr/bin/env python3
"""
Simple HTTP Server with Auto-Reload using Watchdog
Install: pip install watchdog
Run: python server-with-reload.py
"""
import os
import sys
import time
import http.server
import socketserver
import webbrowser
from pathlib import Path
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

PORT = 5500
DIRECTORY = Path(__file__).parent

class ReloadHandler(FileSystemEventHandler):
    """Handle file system events for auto-reload"""
    def __init__(self):
        self.last_reload = time.time()
        self.reload_delay = 1.0  # Delay between reloads (seconds)
    
    def on_modified(self, event):
        if event.is_directory:
            return
        
        # Only reload for specific file types
        if event.src_path.endswith(('.html', '.css', '.js')):
            current_time = time.time()
            
            # Throttle reloads
            if current_time - self.last_reload > self.reload_delay:
                self.last_reload = current_time
                print(f"\n[Auto-Reload] File changed: {event.src_path}")
                print("Refresh your browser to see changes!")

class HTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """Custom HTTP request handler"""
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(DIRECTORY), **kwargs)
    
    def end_headers(self):
        # Add headers for development
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

def main():
    """Main function to start server with auto-reload"""
    # Check if watchdog is installed
    try:
        import watchdog
    except ImportError:
        print("=" * 50)
        print("Watchdog not installed!")
        print("Installing watchdog for auto-reload...")
        print("=" * 50)
        os.system(f"{sys.executable} -m pip install watchdog")
        print("\nPlease run this script again.")
        return
    
    # Setup file watcher
    event_handler = ReloadHandler()
    observer = Observer()
    observer.schedule(event_handler, str(DIRECTORY), recursive=True)
    observer.start()
    
    print("=" * 50)
    print("Portfolio Server with Auto-Reload")
    print("=" * 50)
    print(f"Server: http://localhost:{PORT}")
    print(f"Directory: {DIRECTORY}")
    print("\nWatching for file changes...")
    print("Press Ctrl+C to stop")
    print("=" * 50)
    print()
    
    # Start HTTP server
    with socketserver.TCPServer(("", PORT), HTTPRequestHandler) as httpd:
        # Open browser after 2 seconds
        def open_browser():
            time.sleep(2)
            webbrowser.open(f'http://localhost:{PORT}/index.html')
        
        import threading
        browser_thread = threading.Thread(target=open_browser)
        browser_thread.daemon = True
        browser_thread.start()
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\nStopping server...")
            observer.stop()
    
    observer.join()
    print("Server stopped.")

if __name__ == "__main__":
    main()

