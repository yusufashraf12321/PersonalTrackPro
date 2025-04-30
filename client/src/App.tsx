import { Switch, Route, Router } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Layout from "@/components/layout/layout";
import Home from "@/pages/home";
import Quran from "@/pages/quran";
import Hadith from "@/pages/hadith";
import Courses from "@/pages/courses";
import Community from "@/pages/community";

function AppRoutes() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/quran" component={Quran} />
      <Route path="/hadith" component={Hadith} />
      <Route path="/courses" component={Courses} />
      <Route path="/community" component={Community} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <TooltipProvider>
      <Layout>
        <AppRoutes />
      </Layout>
      <Toaster />
    </TooltipProvider>
  );
}

export default App;
