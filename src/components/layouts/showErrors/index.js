import { v4 as uuidv4 } from "uuid";

const ShowError = ({
  refs,
  count,
  paths,
  messages,
}) => (
  <div className="w-full px-4 py-3 rounded-lg bg-red-100 font-mulish-semi-bold space-y-2 border border-red-200">
    <span className="font-mulish-bold text-red-500 text-sm">{`${count} !`}</span>
    <div className="space-y-2">
      {messages.map((message, index) => (
        <div
          className="text-xs cursor-pointer hover:text-red-400 hover:underline"
          key={uuidv4()}
          onClick={() => refs && refs.current[paths[index]].focus()}
        >
          <span>{`${index + 1}.`}</span>
          <span className="ml-2">
            {`${message}`}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default ShowError;
