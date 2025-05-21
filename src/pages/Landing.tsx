
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { BarChart3, Cloud, ShieldCheck, ArrowRight } from 'lucide-react';

const Landing = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const features = [
    {
      icon: <BarChart3 className="h-10 w-10 text-XCost-blue" />,
      title: t('landing.features.analytics.title', 'Cost Analytics'),
      description: t('landing.features.analytics.description', 'Deep insights into your cloud spending across providers with trend analysis and forecasting.')
    },
    {
      icon: <Cloud className="h-10 w-10 text-XCost-blue" />,
      title: t('landing.features.optimization.title', 'Cost Optimization'),
      description: t('landing.features.optimization.description', 'Identify savings opportunities and get tailored recommendations to reduce unnecessary spending.')
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-XCost-blue" />,
      title: t('landing.features.governance.title', 'FinOps Governance'),
      description: t('landing.features.governance.description', 'Establish policies, budgets and alerts to maintain financial control of your cloud resources.')
    }
  ];

  const testimonials = [
    {
      quote: t('landing.testimonials.quote1', 'X Cost helped us reduce our cloud spend by 34% in just three months while improving resource utilization.'),
      author: 'Maria Silva',
      company: 'TechCloud Inc.'
    },
    {
      quote: t('landing.testimonials.quote2', 'The anomaly detection feature saved us from a massive billing surprise last quarter. Worth every penny.'),
      author: 'Carlos Mendes',
      company: 'DataFlow Systems'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 text-transparent bg-clip-text">
            X Cost
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button 
              onClick={handleLoginClick} 
              className="bg-XCost-blue hover:bg-blue-700 transition-colors"
            >
              {t('landing.login', 'Login')}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                {t('landing.hero.title', 'Optimize Your Cloud Costs with Precision')}
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-xl">
                {t('landing.hero.subtitle', 'Get complete visibility across all your cloud providers and start saving with actionable recommendations.')}
              </p>
              <Button 
                size="lg" 
                className="bg-XCost-blue hover:bg-blue-700 transition-colors font-semibold"
                onClick={() => navigate('/signup')}
              >
                {t('landing.hero.cta', 'Get Started')} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1">
              <div className="relative bg-gradient-to-tr from-blue-100 to-indigo-100 dark:from-blue-950 dark:to-indigo-950 p-4 rounded-xl shadow-lg">
                <img 
                  src="/placeholder.svg" 
                  alt={t('landing.hero.imageAlt', 'Dashboard visualization of cloud cost analytics')} 
                  className="w-full rounded-lg shadow-md"
                />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-XCost-blue/20 rounded-full blur-2xl"></div>
                <div className="absolute -top-4 -left-4 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('landing.features.title', 'Key Features')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('landing.features.subtitle', 'Discover how X Cost helps you manage and optimize your cloud expenditure effectively.')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="mb-3">{feature.icon}</div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('landing.testimonials.title', 'What Our Customers Say')}</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-background shadow-sm rounded-lg p-6 border">
                <blockquote className="text-lg font-medium mb-4">&ldquo;{testimonial.quote}&rdquo;</blockquote>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-XCost-blue/20 rounded-full flex items-center justify-center text-XCost-blue font-bold">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 text-transparent bg-clip-text mb-2">
                X Cost
              </div>
              <p className="text-muted-foreground text-sm">
                {t('landing.footer.copyright', '© 2025 X Cost. All rights reserved.')}
              </p>
            </div>
            <div className="flex flex-wrap gap-6">
              <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                {t('landing.footer.privacy', 'Privacy Policy')}
              </Link>
              <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                {t('landing.footer.terms', 'Terms of Service')}
              </Link>
              <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                {t('landing.footer.contact', 'Contact Us')}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
