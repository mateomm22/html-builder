import React, { Component } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

class SortableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {
        'item 1': true,
        'item 2': true,
        'item 3': true,
        'item 4': true,
        'item 5': true,
        'item 6': true,
        'item 7': true,
        'item 8': true,
        'item 9': true,
      },
    };

    this.updateIndexes = this.updateIndexes.bind(this);
  }

  updateIndexes({ oldIndex, newIndex }) {
    const arr = [
      ...Object.keys(this.state.items),
    ];
    const updatedObj = {};
    arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
    arr.map((key) => {
      updatedObj[key] = true;
      return updatedObj;
    });
    this.setState({ items: updatedObj });
  }

  render() {
    const SortableItem = SortableElement(({ value }) => <tr><td>{value}</td></tr>);

    const SortableList = SortableContainer(({ items }) => (
      <table>
        <tbody>
          {Object.keys(items).map((value, index) => (
            <SortableItem key={`item-${index}`} index={index} value={value} />
          ))}
        </tbody>
      </table>
    ));

    return (
      <div className="container">
        <SortableList items={this.state.items} onSortEnd={this.updateIndexes} />
      </div>
    );
  }
}

export default SortableComponent;
