import Layout from "@/components/layout";
import type { NextPage } from "next";
import Button from "@/components/button";
import TextArea from "@/components/textarea";

const Write: NextPage = () => {
  return (
    <Layout canGoBack title="동네생활 글쓰기">
      <form className="space-y-4 p-4">
        <TextArea required placeholder="궁금한 것을 물어보세요" />
        <Button text="완료" />
      </form>
    </Layout>
  );
};

export default Write;
