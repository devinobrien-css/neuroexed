import { useState } from "react";

export const NewBlog = (args) => {
  const [state, setState] = useState(true);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");
  const [source, setSource] = useState("");
  const [type, setType] = useState("");

  return (
    <div className="editable selected-editable" id={"new-blog"}>
      <div>
        <p>{title}</p>
        <div className="edit-buttons">
          <button
            className="browser-btn"
            onClick={() => {
              if (state) args.remove(false);

              state ? setState(false) : setState(true);
            }}
          >
            {state ? "cancel" : "edit"}
          </button>
          {state ? (
            <>
              <button
                className="browser-btn"
                onClick={async () => {
                  putData(
                    "blogs",
                    {},
                    blog(title, type, date, source, content),
                  );
                  const sort = await fetchData("sort-orders");
                  sort.Items.filter((order) => {
                    return order.type.S === "blogs";
                  })[0].sort.L = [
                    { S: title },
                    ...sort.Items.filter((order) => {
                      return order.type.S === "blogs";
                    })[0].sort.L,
                  ];
                  await putData(
                    "sort-orders",
                    {},
                    sort_order(
                      "blogs",
                      sort.Items.filter((order) => {
                        return order.type.S === "blogs";
                      })[0].sort.L,
                    ),
                  );
                  window.location.reload();
                  setState(false);
                }}
              >
                confirm
              </button>
              <button
                className="browser-btn"
                onClick={async () => {
                  await removeData("blogs", {
                    title: { S: title },
                  });
                  setState(false);
                  args.remove(false);
                }}
              >
                delete
              </button>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className={state ? "hidden-content open" : "hidden-content"}>
        <StandardInput
          title={"Title"}
          className={"border px-2"}
          value={title}
          setValue={setTitle}
        />
        <StandardInput
          title={"Date"}
          className={"border px-2"}
          type="date"
          value={date !== "" ? date : new Date().toISOString().substring(0, 10)}
          setValue={setDate}
        />
        <StandardSelect
          title="Media Type"
          className={"border px-2"}
          options={["BLOG", "PODCAST"]}
          selected={type}
          setSelected={setType}
        />
        <StandardInput
          title={"Source"}
          className={"border px-2"}
          value={source}
          setValue={setSource}
        />
        <StandardTextArea
          title={"Description"}
          className={"border px-2"}
          value={content}
          setValue={setContent}
        />
      </div>
    </div>
  );
};
