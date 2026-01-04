import { useState, useCallback, useRef, useEffect } from "react";
import { useAddCandidStore } from "@/stores/useAddCandid";
import { Button } from "./schadcn/Button";
import { Badge } from "./Badge";
import { getTechCompletion } from "@/lib/api";

const DeleteButton = ({ onClick }) => {
  return (
    <span
      onClick={onClick}
      className="ml-2 hover:text-red-500
      cursor-pointer">
      {`\u00D7`}
    </span>
  )
}

const TechListItem = ({ item, formatItem, cb }) => (
  <span
    onClick={() => cb(item)}
    className=" m-0 px-2 border rounded
                  w-full md:w-[49%] min-h-[2em] h-[2em]
                  leading-[2em] inline-block
                  cursor-pointer break-all"
  >
    {formatItem(item)}
  </span>
)

export default function AddCandidTechInput() {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const delay = 500;

  const inputRef = useRef<HTMLInputElement>(null)
  const [TID, setTID] = useState<NodeJS.Timeout>();

  const tech = useAddCandidStore((state) => state.tech);
  const stack = useAddCandidStore((state) => state.stack);
  const techCompletionList = useAddCandidStore((state) => state.techCompletionList);

  const updateTech = useAddCandidStore((state) => state.updateTech);
  const removeTech = useAddCandidStore((state) => state.removeTech);
  const updateStack = useAddCandidStore((state) => state.updateStack);
  const updateTechCompletionList = useAddCandidStore((state) => state.updateTechCompletionList);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    updateTech(e.target?.value);
    clearTimeout(TID);

    if (!e.target.value) {
      setError(false);
      setLoading(false);
      return;
    }

    setTID(
      setTimeout(
        async () => {
          try {
            setLoading(true);
            const data = await getTechCompletion(e.target.value)
            data.length ? setError(false) : setError(true);
            updateTechCompletionList(data);
          } catch (e) {
            throw new Error("could not fetch tech completion list")
          } finally {
            setLoading(false);
          }
        },
        delay
      )
    );
    setLoading(false);
  }, [TID, loading]);

  const handleItemClick = (i) => {
    updateTech(i.name);
    updateTechCompletionList([]);
    if (inputRef.current) inputRef.current.blur();
  }


  useEffect(() => { console.log("tech completion list", techCompletionList) }, [techCompletionList])

  return (
    <div >
      <div className="flex gap-2 items-baseline">
        <input
          id="tech"
          type="text"
          ref={inputRef}
          placeholder="Tech stack"
          className="w-full h-fit p-1 px-2 block bg-gray-100 rounded"
          value={tech}
          // onChange={(e) => updateTech(e.target.value)}
          onChange={handleChange}
        />
        <Button
          onClick={(e) => {
            updateStack();
            e.target.previousSibling.focus();
          }}
          disabled={tech == ''}
        >
          add
        </Button>
      </div>

      <div className="px-1 flex md:flex-col gap-2">
        <div className=" w-1/2 h-fit">
          <p className="underline">Suggestions </p>
          <div>
            <p>completion list</p>
            {techCompletionList.length && (
              techCompletionList.map((i, k) =>
                <TechListItem
                  key={k}
                  item={i}
                  cb={handleItemClick}
                />
              )
            )
            }
          </div>
        </div>

        <div className="w-1/2 h-fit">
          <p className="underline">Your list </p>
          {stack?.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {stack.map((item, key) => (
                <Badge key={key} >
                  {item}
                  <DeleteButton onClick={() => removeTech(item)} />
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
