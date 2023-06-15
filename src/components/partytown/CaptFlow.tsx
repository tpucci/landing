export const CaptFlow = () => {
  if (!import.meta.env.PROD) return null;

  return (
    <script
      async
      defer
      src="https://cdn.captflow.com/script.js"
      data-token="1688453f-78bb-45bf-9142-b32a42570186"
    />
  );
};
