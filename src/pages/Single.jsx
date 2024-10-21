/* eslint-disable*/
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "swiper/css";
import { Notyf } from "notyf";
import { Helmet } from "react-helmet";
import "notyf/notyf.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Footer from "../components/Footer";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Product from "../components/Product";
import axios from "axios";
import Chat from "../components/Chat";
import CommentList from "../components/CommentList";

function Single() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [gallery, setGallery] = useState([]);
  const [links, setLinks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  // const [comments, setComments] = useState([
  //   { name: "Nguyen Van A", content: "Dịch vụ rất tốt!" },
  //   { name: "Tran Thi B", content: "Tôi sẽ quay lại lần sau." },
  // ]);
  const notyf = new Notyf({
    duration: 1000,
    position: {
      x: "right",
      y: "top",
    },
    types: [
      {
        type: "warning",
        background: "orange",
        icon: {
          className: "material-icons",
          tagName: "i",
          text: "warning",
        },
      },
      {
        type: "error",
        background: "indianred",
        duration: 2000,
        dismissible: true,
      },
      {
        type: "success",
        background: "green",
        color: "white",
        duration: 2000,
        dismissible: true,
      },
      {
        type: "info",
        background: "#24b3f0",
        color: "white",
        duration: 1500,
        dismissible: false,
        icon: '<i class="bi bi-bag-check"></i>',
      },
    ],
  });
  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "products/" + id)
      .then((res) => res.json())
      .then((res) => {
        if (!res.product) {
          window.location.replace("/not-found");
        }
        setProduct(res.product);
        setGallery(res.medias);
        setLinks(res.links);
      });
  }, [id]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const getDescription = () => {
    const fullDescription = product?.content || "";
    const maxLength = 200;
    if (fullDescription.length <= maxLength) {
      return fullDescription;
    }
    return fullDescription.substring(0, maxLength) + "...";
  };
  const addToCart1 = (id) => {
    axios
      .post(process.env.REACT_APP_API_URL + "carts", {
        id_customer: localStorage.getItem("id"),
        id_product: id,
      })
      .then((res) => {
        if (res.data.check == true) {
          notyf.open({
            type: "success",
            message: "Đã thêm vào giỏ hàng",
          });
        }
      });
  };

  const addToCart = (id) => {
    var cart = [];
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
      cart.forEach((el) => {
        if (el[0] == id) {
          el[1] = el[1] + 1;
        } else {
          cart.push([id, 1]);
        }
      });
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      cart = [[id, 1]];
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    notyf.open({
      type: "success",
      message: "Đã thêm vào giỏ hàng",
    });
  };
  return (
    <>
      {!product && (
        <div className="row mt-5 text-center">
          <div className="col-md-3"></div>
          <div className="col-md-3">
            <svg className="w-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
              <circle fill="#397AFF" stroke="#397AFF" stroke-width="15" r="15" cx="40" cy="65">
                <animate attributeName="cy" calcMode="spline" dur="3.3" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate>
              </circle>
              <circle fill="#397AFF" stroke="#397AFF" stroke-width="15" r="15" cx="100" cy="65">
                <animate attributeName="cy" calcMode="spline" dur="3.3" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate>
              </circle>
              <circle fill="#397AFF" stroke="#397AFF" stroke-width="15" r="15" cx="160" cy="65">
                <animate attributeName="cy" calcMode="spline" dur="3.3" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate>
              </circle>
            </svg>
          </div>
        </div>
      )}
      {product && (
        <>
          <Helmet>
            <title>{product.name}</title>
            <meta name="description" content={product.name} />
          </Helmet>
          <Header />
          <section className="page-content">
            <div className="container mt-5">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  {product && (
                    <>
                      <li className="breadcrumb-item">
                        <a href="/">Home</a>
                      </li>
                      <li className="breadcrumb-item" aria-current="page">
                        {product && (
                          <>
                            <a href={"/thuong-hieu/" + product?.brands?.slug}> {product?.brands?.name}</a> - <a href={"/san-pham/" + product?.categories?.slug}> {product?.categories?.name}</a>
                          </>
                        )}
                      </li>
                      <li className="breadcrumb-item active" aria-current="page">
                        {product?.name}
                      </li>
                    </>
                  )}
                </ol>
              </nav>
              <div className="row">
                <div className="col-md-4">
                  <Carousel showStatus={false} showArrows={true}>
                    {gallery &&
                      gallery.map((item, index) => (
                        <div key={index}>
                          <img src={process.env.REACT_APP_IMG_URL + "products/" + item} alt={`gallery-${item}`} />
                        </div>
                      ))}
                  </Carousel>
                </div>
                <div className="col-md p-3">
                  <h4>{product?.name}</h4>

                  <h5
                    style={{
                      fontSize: "15px",
                      fontFamily: "Time News Romance",
                    }}
                    className="pt-3"
                  >
                    Giá sản phẩm : <span className="text-decoration-line-through pe-2">{Intl.NumberFormat("en-US").format(Number(product.price))}</span>
                    <span className="text-danger">{Intl.NumberFormat("en-US").format(Number(product.discount))}</span>
                  </h5>
                  <ul className="nav nav-tabs mt-3" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">
                        Chi tiết sản phẩm
                      </button>
                    </li>
                    {/* <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="profile-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#profile"
                        type="button"
                        role="tab"
                        aria-controls="profile"
                        aria-selected="false"
                      >
                        Comment
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="contact-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#contact"
                        type="button"
                        role="tab"
                        aria-controls="contact"
                        aria-selected="false"
                      >
                        Review sản phẩm
                      </button>
                    </li> */}
                  </ul>
                  <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active ps-2 pt-2" id="home" role="tabpanel" aria-labelledby="home-tab">
                      <div dangerouslySetInnerHTML={{ __html: getDescription() }} />
                      {product?.content && product?.content.length > 200 && (
                        <button className="btn btn-link p-0" onClick={handleShowModal}>
                          Xem thêm
                        </button>
                      )}
                      <div className="mb-4 mt-3 row">
                        <div className="col-md">
                          {!localStorage.getItem("token") && (
                            <button className="btn btn-primary" onClick={(e) => addToCart(product.id)}>
                              Thêm vào giỏ hàng
                            </button>
                          )}
                          {localStorage.getItem("token") && (
                            <button className="btn btn-primary" onClick={(e) => addToCart1(product.id)}>
                              Thêm vào giỏ hàng
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                      ...
                    </div>
                    <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                      ...
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <h3 className="fw-bold">Sản phẩm liên quan</h3>
                <div className="col-md-9 text-center">
                  <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    pagination={{
                      clickable: true,
                    }}
                    breakpoints={{
                      640: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                      },
                      768: {
                        slidesPerView: 2,
                        spaceBetween: 40,
                      },
                      1024: {
                        slidesPerView: 3,
                        spaceBetween: 50,
                      },
                    }}
                    loop={true}
                    className="mySwiper"
                  >
                    {links.length > 0 &&
                      links.map((product, index) => (
                        <SwiperSlide key={index}>
                          <Product name={product.name} image={product.image} price={product.price} slug={product.slug} discount={product.discount} />
                        </SwiperSlide>
                      ))}
                  </Swiper>
                </div>
              </div>
              <div className="card shadow mt-4">
                <div className="card-body">
                  <CommentList comments={product?.comments} />
                </div>
              </div>
              <div className="row mt-3 mb-3 rounded">
                <h3 className="fw-bold">Trò chuyện với app</h3>
                <div className="col">
                  <div class="card shadow border-0">
                    <div class="card-body">
                      <Chat />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Modal show={showModal} size="lg" onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Chi tiết sản phẩm</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="detail" style={{ fontFamily: "Times New Roman" }} dangerouslySetInnerHTML={{ __html: product?.content }} />
            </Modal.Body>
            <Modal.Footer>
              <Button className="btn btn-sm btn-secondary" onClick={handleCloseModal}>
                Đóng
              </Button>
            </Modal.Footer>
          </Modal>

          <Footer />
        </>
      )}
    </>
  );
}

export default Single;
