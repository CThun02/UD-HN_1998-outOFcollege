import { Button, Result } from "antd";
import { Link, Route } from "react-router-dom";

function NotFoundPage({
  errorCode,
  errorMessage,
  errorTitle,
  backLink,
  titleBackName,
}) {
  return (
    <Route
      path="*"
      element={
        <Result
          status={errorCode}
          title={errorTitle}
          subTitle={errorMessage}
          extra={
            <Link to={backLink}>
              <Button type="primary">{titleBackName}</Button>
            </Link>
          }
        />
      }
    />
  );
}

export default NotFoundPage;
