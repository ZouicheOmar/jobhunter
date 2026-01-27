
def test_simple_request_to_base(client):
    response = client.get("hello")
    print(response)
    assert b"work" in response.data

# def test_simple_request_to_scrap(client):
#     response = client.get("scrap/test")
#     print(response)
#     assert response.data == b"blueprint is working, please delete\n"
