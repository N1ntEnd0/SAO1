import React from "react";
import {useLocation} from "react-router";
import {useSelector} from "react-redux"

export const ModalView = () => {
  const location = useLocation();

  const content = useSelector(store => store.object.modal.content);

  return (
      <div>
          <h4>
              {`Просмотр обьекта ${location
                  .pathname.split('/')[1]
                  .toUpperCase()
              }`}
          </h4>
          <pre>
            {JSON.stringify(content, undefined, 4)}
          </pre>
      </div>
  )
}