const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the literal '0' when given no partitionKey", () => {
    var event = {}
    var data = JSON.stringify(event);
    var expectedHash = crypto.createHash("sha3-512").update(data).digest("hex");
    const trivialKey = deterministicPartitionKey(event);
    // createHash converts the string to 512 bits and then .digest("hex")
    // returns the hash value as a hexadecimal string
    // this is 128 characters long - 64 bytes * 2 hex characters per byte
    expect(trivialKey.length).toBe(128);
    expect(trivialKey).toBe(expectedHash);
  });

  it("Returns the partitionKey of length equal to partitionKey when partitionKey <= 256 length", () => {
    var event = {partitionKey: 'e9f5d352b8c5dc5a5fda03fa7e9635c8ec5f556af585bb3f30a943b8de2426922'}
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(event.partitionKey);
  });
  
  it("Returns the partitionKey of length 128 when partitionKey is greator than 256 length", () => {
    var event = {partitionKey: 'e9f5d352b8c5dc5a5fda03fa7e9635c8ec5f556af585bb3f30a943b8de2426922e9f5d352b8c5dc5a5fda03fa7e9635c8ec5f556af585bb3f30a943b8de2426922e9f5d352b8c5dc5a5fda03fa7e9635c8ec5f556af585bb3f30a943b8de2426922e9f5d352b8c5dc5a5fda03fa7e9635c8ec5f556af585bb3f30a943b8de2426922e9f5d352b8c5dc5a5fda03fa7e9635c8ec5f556af585bb3f30a943b8de2426922e9f5d352b8c5dc5a5fda03fa7e9635c8ec5f556af585bb3f30a943b8de2426922'}
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey.length).toBe(128);
  });

  it("Returns stringified partition key if partition key is present and is not string", () => {
    var event = {partitionKey: 1}
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(event.partitionKey.toString());
  });

});



