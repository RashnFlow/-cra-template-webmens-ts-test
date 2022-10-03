import { RefObject, useCallback, useEffect, useRef, useState } from 'react';

/**
 * @return Object
 * @return .ref - attach to container
 * @return .isShow - boolean flag (default false)
 * @return .setShow
 * @return .toggleShow
 */

export const useShowControl = (propsRef?: RefObject<HTMLDivElement>) => {
  const defaultRef = useRef<HTMLDivElement>(null);
  const ref = propsRef || defaultRef;
  const [isShow, setShow] = useState<boolean>(false);

  const toggleShow = useCallback(() => setShow(!isShow), [isShow]);

  const handleClick = useCallback(
    (e: MouseEvent) => {
      // if (ref && ref.current && isShow) {
      //   const { left, top, right, bottom } =
      //     ref.current.getBoundingClientRect();
      //   if (
      //     e.clientX < left ||
      //     e.clientX > right ||
      //     e.clientY < top ||
      //     e.clientY > bottom
      //   ) {
      //     setShow(false);
      //   }
      // }
      if (ref.current && !ref.current.contains(e.target as Node) && isShow) {
        setShow(false);
      }
    },
    [isShow, ref]
  );

  useEffect(() => {
    document.body.addEventListener('click', handleClick);
    return () => {
      document.body.removeEventListener('click', handleClick);
    };
  }, [handleClick, isShow, setShow]);

  return { ref, isShow, setShow, toggleShow };
};
