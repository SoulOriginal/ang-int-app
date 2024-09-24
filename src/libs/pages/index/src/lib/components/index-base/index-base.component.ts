import { Component } from '@angular/core';

@Component({
  selector: 'apps-index-base',
  standalone: true,
  template: '',
})
export class IndexBaseComponent {
  nodes = [
    {
      id: 'meat',
      title: 'Meat',
    },
    {
      id: 'fish',
      title: 'Fish',
    },
    {
      id: 'fru',
      title: 'Fruit',
      children: [
        {
          id: 'app',
          title: 'Apple',
        },
        {
          id: 'ban',
          title: 'Banana',
        },
        {
          id: 'fruloo',
          title: 'Fruit loops',
        },
      ],
    },
  ];
}
