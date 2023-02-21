const { objectId, ObjectId } = require("mongodb");

class ContactService {
  constructor(client) {
    this.Contact = client.db().collection("contacts");
  }

  extractContactData(payload) {
    const contact = {
      name: payload.name,
      email: payload.email,
      address: payload.address,
      phone: payload.phone,
      favorite: payload.favorite,
    };
    Object.keys(contact).forEach(
      (key) => contact[key] === undefined && delete contact[key]
    );
    return contact;
  }

  create = async (payload) => {
    const contact = this.extractContactData(payload);
    const result = await this.Contact.findOneAndUpdate(
      contact,
      { $set: { favorite: contact.favorite === true } },
      { returnDocument: "after", upsert: true }
    );
    return result.value;
  };

  find = async (filter) => {
    const cursor = await this.Contact.find(filter);
    return await cursor.toArray();
  };

  findByName = async (name) => {
    return await this.find({
      name: { $regex: new RegExp(name), $options: "i" },
    });
  };

  findById = async (id) => {
    return await this.Contact.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  };

  update = async (id, payload) => {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = this.extractContactData(payload);
    const result = await this.Contact.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );
    return result.value;
  };

  delete = async (id) => {
    const result = await this.Contact.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result.value;
  };

  findFavorite = async (id) => {
    return await this.find({ favorite: true });
  };

  deleteAll = async (id) => {
    const result = await this.Contact.deleteMany({});
    return result.deletedCount;
  };
}

module.exports = ContactService;
