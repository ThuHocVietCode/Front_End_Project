import React, { useState, useEffect } from "react";
import axios from "axios"; // Đảm bảo đã cài đặt axios bằng lệnh: npm install axios
import "bootstrap/dist/css/bootstrap.min.css";

// Component hiển thị một bình luận
const Comment = ({ name, comment }) => (
  <div className="card mb-2">
    <div className="card-body">
      <h5 className="card-title">{name}</h5>
      <p className="card-text">{comment}</p>
    </div>
  </div>
);

// Component hiển thị danh sách bình luận và form thêm bình luận
const CommentList = ({ comments }) => {
  const [comments, setComments] = useState([comments]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  // Giả sử bạn lấy tên người dùng từ localStorage
  const userName = localStorage.getItem("username") || "Khách hàng";

  const handleChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment) {
      // Thêm comment mới vào danh sách và reset ô nhập liệu
      setComments([...comments, { name: userName, comment: newComment }]);
      setNewComment("");
    }
  };

  return (
    <div className="comment-section mt-4">
      <h2>Bình luận sản phẩm</h2>

      {/* Form thêm bình luận mới */}
      <form className="comment-form mb-4" onSubmit={handleSubmit}>
        <div className="mb-3">
          <textarea className="form-control" placeholder="Nhập bình luận của bạn" value={newComment} onChange={handleChange} rows="3" required />
        </div>
        <button type="submit" className="btn btn-primary">
          Gửi bình luận
        </button>
      </form>

      {/* Hiển thị trạng thái đang tải */}
      {loading ? (
        <p>Loading comments...</p>
      ) : (
        <div className="comment-list">
          {/* Danh sách bình luận */}
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <Comment
                key={comment.id || index} // Sử dụng id nếu có, nếu không sử dụng index
                name={comment.id_user ? `User ${comment.id_user}` : "Anonymous"} // Hiển thị tên hoặc ID người dùng
                comment={comment.comment}
              />
            ))
          ) : (
            <p>Không có bình luận nào.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentList;
