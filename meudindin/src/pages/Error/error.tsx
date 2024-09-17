import { useRouteError } from "react-router-dom";

interface ErrorResponse {
    status?: number;
    statusText?: string;
}

export default function ErrorPage() {
  const error = useRouteError() as ErrorResponse;
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error?.status + '-' + error?.statusText}</i>
      </p>
    </div>
  );
}