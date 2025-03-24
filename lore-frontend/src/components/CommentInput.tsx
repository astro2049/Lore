import { FormEvent, useRef, useState } from "react";

type CommentInputProps = {
    isActiveOnMount?: boolean,
    handleCancelSuperior?: () => void,
    commentButtonText?: string
};

function CommentInput(
    {
        isActiveOnMount = false,
        handleCancelSuperior,
        commentButtonText = "Comment"
    }: CommentInputProps
) {
    const [isActive, setIsActive] = useState(isActiveOnMount);
    const [content, setContent] = useState("");
    const textareaRef = useRef(null);

    function handleInput(e: FormEvent<HTMLTextAreaElement>) {
        // 1. data: Set content state
        setContent(e.currentTarget.value);

        // 2. style: Fit text area height to content height
        const textArea = textareaRef.current! as HTMLTextAreaElement;
        if (textArea.scrollHeight <= 105) {
            return;
        }
        // console.log(textArea.scrollHeight);
        textArea.style.height = textArea.scrollHeight + "px";
    }

    function handleCancel() {
        if (handleCancelSuperior) {
            handleCancelSuperior();
        } else {
            setContent("");
            setIsActive(false);
        }
    }

    function handleComment() {
        if (handleCancelSuperior) {
            handleCancelSuperior();
        } else {
            setContent("");
            setIsActive(false);
        }
    }

    return (
        <div className="my-1 relative">
            <textarea placeholder="Join the conversation"
                      value={content}
                      onFocus={() => setIsActive(true)}
                      onInput={handleInput}
                      className={
                          "block w-full overflow-hidden text-sm px-1 border border-white/20 rounded-2xl " +
                          (isActive ? "h-[105px] pt-0.75 pb-4 placeholder-transparent" : "h-[40px] py-0.5")
                      }
                      ref={textareaRef}
            />
            {isActive &&
                <div className="w-full absolute bottom-0.25 right-0.5 text-white-custom">
                    <div className="flex w-full justify-end">
                        <button
                            onClick={handleCancel}
                            className="h-[32px] px-0.75 text-xs bg-gray-custom-2 hover:bg-gray-custom-3 rounded-full">
                            Cancel
                        </button>
                        <button
                            onClick={handleComment}
                            className="ml-0.5 h-[32px] px-0.75 text-xs bg-blue-800 hover:bg-blue-600 rounded-full">
                            {commentButtonText}
                        </button>
                    </div>
                </div>
            }
        </div>
    );
}

export default CommentInput;
