import React, { Component } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';

class SortableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        'item 1',
        'item 2',
        'item 3',
        'item 4',
        'item 5',
        'item 6',
        'item 7',
        'item 8',
        'item 9',
      ],
      // items: {
      //   'item 1': true,
      //   'item 2': true,
      //   'item 3': true,
      //   'item 4': true,
      //   'item 5': true,
      //   'item 6': true,
      //   'item 7': true,
      //   'item 8': true,
      //   'item 9': true,
      // },
    };
  }

  onSortEnd({ oldIndex, newIndex, collection }) {
    console.log({ oldIndex, newIndex, collection });
    // console.log(arrayMove(this.state.items, oldIndex, newIndex));
    // const reOrdered = arrayMove(this.state.items, oldIndex, newIndex);

    // this.setState({
    //   items: reOrdered,
    // });
    // this.setState(({ items }) => ({
    //   items: arrayMove(items, oldIndex, newIndex),
    // }));
  }

  render() {
    const SortableItem = SortableElement(({ value }) => <tr><td>{value}</td></tr>);

    const SortableList = SortableContainer(({ items }) => (
      <table>
        <tbody>
          {items.map((value, index) => (
            <SortableItem key={`item-${index}`} index={index} value={value} />
          ))}
        </tbody>
      </table>
    ));

    return (
      <div className="container">
        <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />;
      </div>
    );
  }
}

export default SortableComponent;
