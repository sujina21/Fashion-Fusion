import React from "react";

type Props = {
  message: string;
};

function ErrorPage(props: Props) {
  return <h1 className='text-center'>{props.message}</h1>;
}

export default ErrorPage;
