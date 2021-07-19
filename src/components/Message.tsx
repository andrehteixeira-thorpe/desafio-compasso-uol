type Message = {
  text: string;
}

export default function Message(porps:Message) {
  return(
    <div className="d-flex justify-content-center align-items-center border-1 mt-5">
      {porps.text}
    </div>
  );
}