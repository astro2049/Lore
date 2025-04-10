import { api } from "../Utils.ts";
import { MouseEvent, useContext } from "react";
import { DeleteButtonContext } from "../constants/contexts.ts";

type DeleteButtonProps = {
    link: string,
    onDelete?: () => void,
    className: string
}

function DeleteButton({
                          link,
                          onDelete,
                          className
                      }: DeleteButtonProps) {
    const { onDeleteFromContext } = useContext(DeleteButtonContext);

    function handleClick(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        e.stopPropagation();
        api.delete(link)
            .then((res) => {
                console.log(res);
                if (onDelete) {
                    onDelete();
                    return;
                }
                if (onDeleteFromContext) {
                    onDeleteFromContext();
                    return;
                }
            })
            .catch((e) => {
                console.log(e);
            })
    }

    return (
        <button
            onClick={handleClick}
            className={className}
        >
            Delete
        </button>
    );
}

export default DeleteButton;
