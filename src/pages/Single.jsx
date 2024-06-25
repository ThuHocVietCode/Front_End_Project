/* eslint-disable*/
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Footer from "../components/Footer";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Product from "../components/Product";

function Single() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [gallery, setGallery] = useState([]);
  const [links, setLinks] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "products/" + id)
      .then((res) => res.json())
      .then((res) => {
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

  return (
    <>
      <Header />
      <section className="page-content">
        <div className="container mt-5">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              {product && (
                <>
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item" aria-current="page">
                    {product?.brands?.name} - {product?.categories?.name}
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
                      <img
                        src={process.env.REACT_APP_IMG_URL + "products/" + item}
                        alt={`gallery-${item}`}
                      />
                    </div>
                  ))}
              </Carousel>
            </div>
            <div className="col-md-5 p-3">
              <h4>{product?.name}</h4>
              <h5>Thương hiệu : {product?.brands?.name}</h5>
              <h5>Loại sản phẩm : {product?.categories?.name}</h5>
              <ul className="nav nav-tabs mt-3" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="home-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#home"
                    type="button"
                    role="tab"
                    aria-controls="home"
                    aria-selected="true"
                  >
                    Chi tiết sản phẩm
                  </button>
                </li>
                <li className="nav-item" role="presentation">
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
                </li>
              </ul>
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active ps-2 pt-2"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div dangerouslySetInnerHTML={{ __html: getDescription() }} />
                  {product?.content && product?.content.length > 200 && (
                    <button
                      className="btn btn-link p-0"
                      onClick={handleShowModal}
                    >
                      Show more
                    </button>
                  )}
                  <div className="mb-4 mt-3 row">
                    <div className="col-md">
                      <button className="btn btn-primary">
                        Thêm vào giỏ hàng
                      </button>
                    </div>
                  </div>
                </div>

                <div
                  className="tab-pane fade"
                  id="profile"
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                >
                  ...
                </div>
                <div
                  className="tab-pane fade"
                  id="contact"
                  role="tabpanel"
                  aria-labelledby="contact-tab"
                >
                  ...
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-3">
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
              {links.length>0 && links.map((product,index)=>(
                <SwiperSlide key={index}>
                    <Product
                    name={product.name}
                    image={product.image}
                    price={product.price}
                    slug={product.slug}
                    discount={product.discount}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            </div>
          </div>
        </div>
      </section>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
          className="detail"
            style={{ fontFamily: "Times New Roman" }}
            dangerouslySetInnerHTML={{ __html: product?.content }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-sm btn-secondary"
            onClick={handleCloseModal}
          >
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </>
  );
}

export default Single;
