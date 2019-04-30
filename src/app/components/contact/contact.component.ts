import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

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

  constructor(private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Grocery live - Contact us');
  }

  onSubmit() {
    alert(this.message);
  }

}
