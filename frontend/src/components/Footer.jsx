import { logo_2 } from "../assets/home";
import Container from "./Container";

export default function Footer() {
  return (
    <footer className="bg-[#212121] py-14 text-white"> 
      <Container>
        <div className="grid  sm:text-left text-center lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
          {/* <img src={logo_2} alt="Grant canyon" className="w-44 h-14" />  */}
          {/* Comment  */}
          <div className="sm:mt-0 mt-14">
            <h1 className="font-bold capitalize sm:pt-0 pt-8 pb-4">Quick Links
                </h1>
            <ul>
            <li>
                <a href="#">--------------------</a>
              </li>
              <li>
                <a href="#">Universities</a>
              </li>
              <li>
                <a href="#">Colleges</a>
              </li>
              <li>
                <a href="#">Courses</a>
              </li>
              <li>
                <a href="#">Enterance Exams</a>
              </li>
              <li>
                <a href="#">Rank Predictor</a>
              </li>
              <li>
                <a href="#">Gallery</a>
              </li>
              <li>
                <a href="#">Mock Exams</a>
              </li>
              
            </ul>
          </div>
          <div className="sm:mt-0 mt-14">
            <h1 className="font-bold capitalize sm:pt-0 pt-8 pb-4">Useful URLS</h1>
            <ul>
            <li>
                <a href="#">--------------------</a>
              </li>
              <li>
                <a href="#">ADownload App</a>
              </li>
              <li>
                <a href="#">Expert Advice</a>
              </li>
              <li>
                <a href="#">Important Links</a>
              </li>
              <li>
                <a href="#">Feedback</a>
              </li>
              <li>
                <a href="#">Sign in</a>
              </li>
              <li>
                <a href="#">Join Us</a>
              </li>
          
            </ul>
          </div>
          <div className="sm:mt-0 mt-14">
            <h1 className="font-bold capitalize sm:pt-0 pt-8 pb-4">Follow us</h1>
            <ul>
            <li>
                <a href="#">--------------------</a>
              </li>
              <li>
                <a href="#">Facebook</a>
              </li>
              <li>
                <a href="#">Twitter</a>
              </li>
              <li>
                <a href="#">Linkedin</a>
              </li>
              <li>
                <a href="#">Instagram</a>
              </li>
              <li>
                <a href="#">Whatsapp</a>
              </li>
              <li>
                <a href="#">Advertisements</a>
              </li>
            
            </ul>
          </div>
          
          <div className="sm:mt-0 mt-14">
            <h1 className="font-bold capitalize sm:pt-0 pt-8 pb-4">Enterance Exams</h1>
            <ul>
            <li>
                <a href="#">--------------------</a>
              </li>
              <li>
                <a href="#">MHT-CET</a>
              </li>
              <li>
                <a href="#">JEE MAIN</a>
              </li>
              <li>
                <a href="#">JEE Advance</a>
              </li>
              <li>
                <a href="#">NEET UG</a>
              </li>
              <li>
                <a href="#">NEET PG</a>
              </li>
              <li>
                <a href="#">NDA</a>
              </li>
              <li>
                <a href="#">CLAT</a>
              </li>
              
            </ul>
          </div>
          <div>
            <h1 className="font-bold capitalize sm:pt-0 pt-8 pb-4">Our Products</h1>
            <ul>
            <li>
                <a href="#">--------------------</a>
              </li>
              <li>
                <a href="#">VidyarthiMitra.org</a>
              </li>
              <li>
                <a href="#">E-paper- Digital News Portal</a>
              </li>
              <li>
                <a href="#">Career Assessment Test</a>
              </li>
              <li>
                <a href="#">DET Cut-offs 2024-25</a>
              </li>
              <li>
                <a href="#">11th Cut-offs 2024-25</a>
              </li>
              <li>
                <a href="#">Govt. & Private Jobs</a>
              </li>
              <li>
                <a href="#">Practice Tests</a>
              </li>
              <li>
                <a href="#">Study Abroad</a>
              </li>
            </ul>
          </div>
          <div>
            <h1 className="font-bold capitalize sm:pt-0 pt-8 pb-4">Contact Us</h1>
            <ul>
            <li>
                <a href="#">--------------------</a>
              </li>
              <li>
                <a href="#">+91 77200 25900</a>
              </li>
              <li>
                <a href="#">+91 77200 25900</a>
              </li>
              <li>
                <a href="#">contact@vidyarthimitra.org</a>
              </li>
              <li>
                <a href="#">info@vidyarthimitra.org</a>
              </li>
              
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
}
