import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import Cart from "./Cart";

const CartModal = forwardRef(function CartModal(
  { cartItems, onUpdateCartItemQuantity, title, actions },
  ref
) {
  const dialog = useRef();

  useImperativeHandle(ref, () => ({
    open: () => dialog.current.showModal(),
  }));

  return createPortal(
    <dialog id="modal-dialog" ref={dialog}>
      <h2>{title}</h2>
      <Cart items={cartItems} onUpdateItemQuantity={onUpdateCartItemQuantity} />
      <form method="dialog" id="modal-actions">
        {actions}
      </form>
    </dialog>,

    document.getElementById("modal")
  );
});

export default CartModal;
