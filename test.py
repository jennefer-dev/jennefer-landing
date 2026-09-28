import requests

# Replace with your actual GLM API endpoint and key
API_URL = "https://open.bigmodel.cn/api/paas/v4/chat/completions"
API_KEY = "107589afc53649fe932ec448e55875aa.B3dJNMlsv4NZfGXO"

# Example request payload
payload = {
    "model": "glm-5.3-flash",
    "messages": [
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Hello!"}
    ],
    "max_tokens": 50
}

try:
    response = requests.post(
        API_URL,
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json"
        },
        json=payload,
        timeout=15
    )

    # Raise error if request failed
    response.raise_for_status()

    # Print API response
    print("Response JSON:", response.json())

    # Check rate limit headers (names may vary by provider)
    print("\n--- Rate Limit Info ---")
    print("Requests Remaining:", response.headers.get("x-ratelimit-remaining-requests"))
    print("Tokens Remaining:", response.headers.get("x-ratelimit-remaining-tokens"))
    print("Requests Limit per Minute:", response.headers.get("x-ratelimit-limit-requests"))
    print("Tokens Limit per Minute:", response.headers.get("x-ratelimit-limit-tokens"))
    print("Reset Time (seconds):", response.headers.get("x-ratelimit-reset-requests"))

except requests.exceptions.RequestException as e:
    print("Error communicating with GLM API:", e)