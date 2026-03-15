import requests
import random
import string

BASE_URL = "http://127.0.0.1:8000"

def generate_random_email():
    return "".join(random.choices(string.ascii_lowercase, k=10)) + "@test.com"

def test_auth():
    email = generate_random_email()
    password = "testpassword123"
    name = "Test User"
    role = "patient"

    print(f"Testing Registration for {email}...")
    reg_response = requests.post(
        f"{BASE_URL}/auth/register",
        json={"name": name, "email": email, "password": password, "role": role}
    )
    
    if reg_response.status_code == 200:
        print("Registration: SUCCESS")
    else:
        print(f"Registration: FAILED ({reg_response.status_code})")
        print(reg_response.text)
        return

    print("Testing Login...")
    login_response = requests.post(
        f"{BASE_URL}/auth/login",
        json={"email": email, "password": password}
    )

    if login_response.status_code == 200:
        data = login_response.json()
        print("Login: SUCCESS")
        print(f"Token: {data.get('access_token')[:20]}...")
        print(f"Role: {data.get('role')}")
    else:
        print(f"Login: FAILED ({login_response.status_code})")
        print(login_response.text)

if __name__ == "__main__":
    test_auth()
