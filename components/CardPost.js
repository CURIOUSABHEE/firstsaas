const CardPost = ({ post }) => {
  return (
    <li className="bg-base-100 p-6 rounded-3xl flex justify-between items-center">
      <div>
        <div className="font-bold md-1">{post.title}</div>
        <div className="opacity-80 leading-relevant max-h-32 overflow-scroll">
          {post.description}
        </div>
      </div>
      <button className="btn btn-square">⬆️</button>
    </li>
  );
};
export default CardPost;
