import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd';
import { useRef } from 'react';
import styles from "./draggable-ingredient.module.css";



function DraggableIngredient({ item, handleClose, index, moveCard, uuid }) {

  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: "draggedIngredient",
    item: () => {
      return { item, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ handlerId }, drop] = useDrop({
    accept: "draggedIngredient",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      moveCard(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  drag(drop(ref))
  const listElementStyle = isDragging ? `${styles.listElement} ${styles.isDragging}` : `${styles.listElement}`;


  return (
    <li className={listElementStyle} ref={ref}>
      <DragIcon type="primary" />
      <ConstructorElement
        isLocked={false}
        type="undefined"
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => handleClose(item)}
      />
    </li>
  );
}

DraggableIngredient.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,   
  }).isRequired,
  handleClose: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  moveCard: PropTypes.func.isRequired,
  uuid: PropTypes.string.isRequired,
};

export default DraggableIngredient;