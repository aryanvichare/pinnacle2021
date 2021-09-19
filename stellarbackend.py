import os
import json
import random
import hashlib
import time

import requests

from hashlib import sha256
# from stellar_sdk.keypair import Keypair
# from stellar_sdk.server import Server

from stellar_sdk import Keypair, Network, Server, TransactionBuilder


def hashthis(st):


    hash_object = hashlib.md5(st.encode())
    h = str(hash_object.hexdigest())
    return h



def dummy(request):
    """Responds to any HTTP request.
    Args:
        request (flask.Request): HTTP request object.
    Returns:
        The response text or any set of values that can be turned into a
        Response object using
        `make_response <http://flask.pocoo.org/docs/1.0/api/#flask.Flask.make_response>`.
    """
    if request.method == 'OPTIONS':
        # Allows GET requests from origin https://mydomain.com with
        # Authorization header
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Max-Age': '3600',
            'Access-Control-Allow-Credentials': 'true'
        }
        return ('', 204, headers)

    # Set CORS headers for main requests
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true'
    }

    request_json = request.get_json()



    receiver_public_key = os.environ.get('ownpublic')

#     mongostr = os.environ.get('MONGOSTR')
#     client = pymongo.MongoClient(mongostr)
#     db = client["stellar"]


    retjson = {}

    action = request_json['action']

    if action == "keygen":
        
        pair = Keypair.random()
        # print(f"Secret: {pair.secret}")
        # Secret: SCMDRX7A7OVRPAGXLUVRNIYTWBLCS54OV7UH2TF5URSG4B4JQMUADCYU
        # print(f"Public Key: {pair.public_key}")
        retjson['status'] = "generated"                
        retjson['secret'] = pair.secret
        retjson['public'] = pair.public_key
        

        return json.dumps(retjson)

    if action == "payment":
        
        amount = request_json['amount']
        ksecret = request_json['secret']
        
        kp = Keypair.from_secret(ksecret)

        server = Server(horizon_url="https://horizon-testnet.stellar.org")

        # Transactions require a valid sequence number that is specific to this account.
        # We can fetch the current sequence number for the source account from Horizon.
        source_account = server.load_account(kp.public_key)

        base_fee = server.fetch_base_fee()
        # we are going to submit the transaction to the test network,
        # so network_passphrase is `Network.TESTNET_NETWORK_PASSPHRASE`,
        # if you want to submit to the public network, please use `Network.PUBLIC_NETWORK_PASSPHRASE`.
        lamount = request_json['amount']
        transaction = (
            TransactionBuilder(
                source_account=source_account,
                network_passphrase=Network.TESTNET_NETWORK_PASSPHRASE,
                base_fee=base_fee,
            )
            .add_text_memo("the way is NeuroWay!")  # Add a memo
            # Add a payment operation to the transaction
            # Send 350.1234567 XLM to receiver
            # Specify 350.1234567 lumens. Lumens are divisible to seven digits past the decimal.
            .append_payment_op(receiver_public_key, lamount, "XLM")
            .set_timeout(30)  # Make this transaction valid for the next 30 seconds only
            .build()
        )

        transaction.sign(kp)

        response = server.submit_transaction(transaction)

        retjson['status'] = response                
        # retjson['secret'] = pair.secret
        # retjson['public'] = pair.public_key
        

        return json.dumps(retjson)



    if action == "loadxlm":
        
        public_key = request_json['publickey']

        response = requests.get(f"https://friendbot.stellar.org?addr={public_key}")
        if response.status_code == 200:
            status = "success"
            # print(f"SUCCESS! You have a new account :)\n{response.text}")
        else:
            status = "fail"
            # print(f"ERROR! Response: \n{response.text}")
        
        retjson['status'] = status                
        retjson['public'] = public_key
        

        return json.dumps(retjson)



    if action == "getbalance":
        
        public_key = request_json['publickey']

        server = Server("https://horizon-testnet.stellar.org")
        # public_key = "GD4NB2FLQAN5JO7PKPGZJMNBDYQXVSNVC7DEIZMOL5WSNSBLEBUTEF5Q"

        account = server.accounts().account_id(public_key).call()
        balances = []
        for balance in account['balances']:
            x = f"Type: {balance['asset_type']}, Balance: {balance['balance']}"
            balances.append(x)
            # print(f"Type: {balance['asset_type']}, Balance: {balance['balance']}")

        retjson['balances'] = balances                
        retjson['public'] = public_key
        

        return json.dumps(retjson)

     

    retstr = "action not done"

    if request.args and 'message' in request.args:
        return request.args.get('message')
    elif request_json and 'message' in request_json:
        return request_json['message']
    else:
        return retstr
