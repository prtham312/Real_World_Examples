class Sender {
    constructor(userId) {
      this.userId = userId;
      this.message = "";
      this._permissions = new Set(); 
    }
  
    
    grantPermission(receiverId) {
      this._permissions.add(receiverId);
    }
  
    
    revokePermission(receiverId) {
      this._permissions.delete(receiverId);
    }
  
  
    _canModify(requesterId) {
      return requesterId === this.userId || this._permissions.has(requesterId);
    }
  
    write_message(message, requesterId) {
      if (!this._canModify(requesterId)) {
        console.error(`Permission denied: ${requesterId} cannot write message`);
        return;
      }
      if (!message) return;
      this.message = this.message ? this.message + message : message;
    }
  
    edit_message(message, requesterId) {
      if (!this._canModify(requesterId)) {
        console.error(`Permission denied: ${requesterId} cannot edit message`);
        return;
      }
      if (!message) return;
      this.message = message;
    }
  
    delete_message(requesterId) {
      if (!this._canModify(requesterId)) {
        console.error(`Permission denied: ${requesterId} cannot delete message`);
        return;
      }
      this.message = "";
    }
  
    print(requesterId) {
      console.log(this.message);
    }
  }
  
  class Receiver {
    constructor(sender, userId) {
      this.sender = sender;
      this.userId = userId;
    }
  
    print_message() {
      console.log("Message received by sender:", this.sender.message);
    }
  
    write_message(message) {
      this.sender.write_message(message, this.userId);
    }
  
    edit_message(message) {
      this.sender.edit_message(message, this.userId);
    }
  
    delete_message() {
      this.sender.delete_message(this.userId);
    }
  }

  

  let alice = new Sender("alice");
  
  let bob   = new Receiver(alice, "bob");
  let carol = new Receiver(alice, "carol");
  
  alice.write_message("Initial text. ", "alice");  
  bob.print_message();    
  bob.write_message("Oops!");  
  
  

  alice.grantPermission("bob");
  bob.write_message(" Bob was here. ");
  bob.print_message();    
 
 
  carol.edit_message("Carol edit");
 

  alice.edit_message("Reset by Alice.", "alice");
  alice.print();          
  
  
