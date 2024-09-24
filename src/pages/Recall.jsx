/* eslint-disable*/
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import axios from "axios";
import { Helmet } from "react-helmet";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { ElevatorSharp } from "@mui/icons-material";
function Recall() {
	const [email,setEmail]= useState('');
	const [password,setPassword]= useState('');
	const [token,setToken]= useState('');
	const [password1,setPassword1]= useState('');
	useEffect(()=>{

	},[])
	const submitForget=()=>{
		if(email==''){
			notyf.error("Vui lòng nhập email cần lấy mật khẩu");
		}else if(password==''||password1==''){
			notyf.error("Vui lòng nhập đủ 2 lần mật khẩu");
        }else if(password!=password1){
			notyf.error("Vui lòng nhập lại chính xác mật khẩu");
        }
        else{
			axios.post(process.env.REACT_APP_API_URL+'customers/submitForgetPassword', { 
				email: email, 
                token:token,
                password:password
			})
			.then((res)=> {
				if(res.data.check==false){
					if(res.data.msg){
						notyf.error(res.data.msg); 
					}
				}else if(res.data.check==true){
                    setTimeout(() => {
						notyf.success('Đã đổi thành công. Mời đăng nhập lại'); 
                    }, 1700);
                    window.location.replace('/dang-nhap')
                }
			})
			.catch(error => {
				notyf.error("Có lỗi xảy ra, vui lòng thử lại."); 
			});
		}
	}

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

	return (
		<>
			<Header />
			<Helmet>
				<title>Thiết lập lại mật khẩu</title>
				<meta name="description" content="Quên mật khẩu" />
			</Helmet>
			<div className="page-content">
				<div className="container pt-5 pb-5">
					<nav aria-label="breadcrumb">
						<ol className="breadcrumb">
							<>
								<li className="breadcrumb-item">
									<a href="/">Home</a>
								</li>
								<li className="breadcrumb-item active" disabled aria-current="page">
									<a style={{ textDecoration: "none" }} href="#">
										Thiết lập lại mật khẩu
									</a>
								</li>
							</>
						</ol>
					</nav>
					<section className="container px-0">
						<div className="card border-light-subtle shadow-sm">
							<div className="row g-0">
								<div className="col-12 col-md-6 text-bg-dark">
									<div className="d-flex align-items-center justify-content-center h-100">
										<div className="col-10 col-xl-8 py-3">
											<hr className="border-dark-subtle mb-4" />
											<h2 className="h1 mb-4">30GLOW</h2>
											<p className="lead m-0">Hệ thống chuyên gia tóc cao cấp.</p>
										</div>
									</div>
								</div>
								<div className="col-12 col-md-6">
									<div className="card-body p-3 p-md-4 p-xl-5">
										<div className="row">
											<div className="col-12">
												<div className="mb-5">
													<h3>Thiết lập mật khẩu</h3>
												</div>
											</div>
										</div>
										<form action="#!">
											<div className="row gy-3 gy-md-4 overflow-hidden">
												<div className="col-12">
													<label htmlFor="email" className="form-label">
														Nhập địa chỉ Email <span className="text-danger">*</span>
													</label>
													<input type="email" className="form-control"  onChange={(e)=>setEmail(e.target.value)} name="email" id="email" placeholder="name@example.com" required="" />
												</div>
                                                <div className="col-12">
													<label htmlFor="email" className="form-label">
														Nhập mã token <span className="text-danger">*</span>
													</label>
													<input type="text" className="form-control"  onChange={(e)=>setToken(e.target.value)} name="token" id="token" placeholder="name@example.com" required="" />
												</div>
                                                <div className="col-12">
													<label htmlFor="email" className="form-label">
														Nhập mật khẩu mới <span className="text-danger">*</span>
													</label>
													<input type="password" className="form-control"  onChange={(e)=>setPassword(e.target.value)} name="password" id="password" placeholder="name@example.com" required="" />
												</div>
                                                <div className="col-12">
													<label htmlFor="email" className="form-label">
														Nhập lại mật khẩu <span className="text-danger">*</span>
													</label>
													<input type="password" className="form-control"  onChange={(e)=>setPassword1(e.target.value)} name="password1" id="password1" placeholder="name@example.com" required="" />
												</div>
												<div className="col-12">
													<div className="d-grid">
														<button className="btn bsb-btn-xl btn-dark" onClick={(e)=>submitForget()} type="button">
															Gửi
														</button>
													</div>
												</div>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</section>
				</div>
			</div>
			<Footer />
		</>
	);
}

export default Recall;