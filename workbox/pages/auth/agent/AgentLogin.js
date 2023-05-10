"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
// import { NavLink } from "react-router-dom";
const styled_components_1 = __importDefault(require("styled-components"));
const yup = __importStar(require("yup"));
const sweetalert2_1 = __importDefault(require("sweetalert2"));
const yup_1 = require("@hookform/resolvers/yup");
const react_hook_form_1 = require("react-hook-form");
const react_router_dom_1 = require("react-router-dom");
const react_query_1 = require("@tanstack/react-query");
const Store_1 = require("../../../services/statemanagement/Store");
const ReduxState_1 = require("../../../services/statemanagement/ReduxState");
const utils_1 = require("../../../utils");
// import { loginDirector } from "../../../utils";
const AgentLogin = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const dispatch = (0, Store_1.UseAppDispatch)();
    const userSchema = yup
        .object({
        email: yup.string().required("please enter an email"),
        name: yup.string().required("please enter a name"),
    })
        .required();
    const { handleSubmit, formState: { errors }, reset, register, } = (0, react_hook_form_1.useForm)({
        resolver: (0, yup_1.yupResolver)(userSchema),
    });
    const posting = (0, react_query_1.useMutation)({
        mutationKey: ["login"],
        mutationFn: utils_1.loginDirector,
        onSuccess: (myData) => {
            dispatch((0, ReduxState_1.directorLogin)(myData.data));
            sweetalert2_1.default.fire({
                icon: "success",
                title: "Login succesful",
                html: "Taking you to your dashboard",
                timer: 2000,
                didOpen: () => {
                    sweetalert2_1.default.showLoading();
                },
                willClose: () => {
                    navigate("/director/home");
                },
            });
        },
        onError: (error) => {
            // handle error here
            sweetalert2_1.default.fire({
                title: "login failed",
                text: "email or name incorrect",
                icon: "error",
            });
        },
    });
    const Submit = handleSubmit((data) => __awaiter(void 0, void 0, void 0, function* () {
        posting.mutate(data);
        // reset()
    }));
    return (<Container>
        {posting.isLoading ? <utils_1.Loading /> : null}
      <Wrapper>
        <h4>ecoBin</h4>
        <h2>Sign in</h2>
        <p>
          Don't have an account?
          <react_router_dom_1.NavLink to="/agent/register" style={{
            textDecoration: "none",
            margin: "3px",
            color: "#3C37FF",
        }}>
            Create one
          </react_router_dom_1.NavLink>
        </p>

        <Form onSubmit={Submit}>
          <InputHold>
            <span>Email</span>
            <input type="email" required placeholder="please enter your email" {...register("email")}/>
          </InputHold>
          <InputHold>
            <span>Name</span>
            <input type="password" required placeholder="please enter name" {...register("name")}/>
          </InputHold>

          <Button type="submit"> Sign in</Button>
        </Form>
      </Wrapper>
    </Container>);
};
exports.default = AgentLogin;
const Button = styled_components_1.default.button `
  padding: 20px 30px;
  background-color: #3c37ff;
  border: 0;
  margin: 0;
  margin-top: 30px;
  color: #fff;
  font-size: 18px;
  border-radius: 10px;

  :hover {
    cursor: pointer;
  }
`;
const InputHold = styled_components_1.default.div `
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  span {
    margin: 0;
    margin-bottom: 10px;
    font-weight: 500;
  }

  input {
    width: 60%;
    height: 35px;
    padding: 10px;
    font-size: 17px;
    color: #000000d5;
    border: 1px solid lightgrey;
    border-radius: 5px;
    outline: 0;

    :focus {
      border: 1px solid #3c37ff;
    }

    ::placeholder {
      color: #00000044;
    }

    @media screen and (max-width: 980px) {
      width: 90%;
    }
  }
`;
const Form = styled_components_1.default.form ``;
const Wrapper = styled_components_1.default.div `
  width: 85%;
  height: 85%;

  h2 {
    margin: 0;
    margin-bottom: 8px;
    font-weight: 600;
    font-size: 2rem;
  }

  p {
    margin: 0;
    font-size: 15px;
    margin-bottom: 35px;
  }

  h4 {
    display: none;

    @media screen and (max-width: 748px) {
      display: block;
      margin: 0;
      margin-bottom: 50px;
      color: #3c37ff;
      letter-spacing: 2px;
      font-weight: 500;
    }
  }
`;
const Container = styled_components_1.default.div `
  width: calc(100vw - 500px);
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fefefe;

  @media screen and (max-width: 1024px) {
    width: calc(100vw - 400px);
  }
  @media screen and (max-width: 748px) {
    width: 100%;
  }
`;
