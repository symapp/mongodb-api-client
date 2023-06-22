import { Injectable } from '@angular/core';
import { MongoClient, ServerApiVersion } from "mongodb";

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

   uri = "mongodb+srv://diasalmeidasimao:ZAJCNkhuHku576SQ@cluster0.wnnvhsk.mongodb.net/?retryWrites=true&w=majority";

  client = new MongoClient(this.uri,  {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    }
  );


  constructor() { }



  public async connect() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await this.client.connect();
      // Send a ping to confirm a successful connection
      await this.client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await this.client.close();
    }
  }
}
