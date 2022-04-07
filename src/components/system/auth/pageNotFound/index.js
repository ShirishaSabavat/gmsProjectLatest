const Error404 = () => (
  <div
    className="flex flex-col items-center justify-center space-y-4"
    style={{ height: "calc(100vh - 70px)", minHeight: 450 }}
  >
    <img
      src="assets/images/page/404-page-1.svg"
      alt="access denied"
      width={300}
    />
    <div className="flex flex-col items-center font-mulish-semi-bold text-xs">
      <span>You shouldn&apos;t be here.</span>
      <span className="my-2 text-red-500">
        leave this instant or I am calling the police on you.
      </span>
    </div>
  </div>
);

export default Error404;
