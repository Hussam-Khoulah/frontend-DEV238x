import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  subjects = ['ticket', 'suggestion', 'claim'];
  name = 'john smith';
  email = 'john.smith@gmail.com';
  subject = this.subjects[0];
  message = 'nice design!';

  constructor() { }

  ngOnInit() { }

  onSubmit() {
    alert(this.message);
  }

}
