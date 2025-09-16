// Landing.jsx - Main landing page for TradeCRM
const Landing = () => {
    const [scrolled, setScrolled] = React.useState(false);
    const [showPopup, setShowPopup] = React.useState(false);
    const [showSuccess, setShowSuccess] = React.useState(false);
    const [formData, setFormData] = React.useState({
        name: '',
        business: '',
        email: '',
        extraInfo: ''
    });

    React.useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        setTimeout(() => lucide.createIcons(), 100);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navigateToLogin = () => {
        setShowPopup(true);
    };

    const navigateToSignup = () => {
        setShowPopup(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/submit-contact-form', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (result.success) {
                setShowPopup(false);
                setShowSuccess(true);
                setFormData({ name: '', business: '', email: '', extraInfo: '' });
                // Auto close success popup after 3 seconds
                setTimeout(() => setShowSuccess(false), 3000);
            } else {
                alert('Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Network error. Please try again.');
        }
    };

    // Calculate launch date (3 weeks from now)
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 21);

    // Calculate time until launch
    const [timeLeft, setTimeLeft] = React.useState({});

    React.useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const difference = launchDate - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const features = [
        {
            icon: 'settings',
            title: '100% Customisable',
            description: 'Every feature can be tailored to your exact needs. No compromise, just ask!',
            highlight: true
        },
        {
            icon: 'users',
            title: 'Customer Management',
            description: 'Keep all your customer information organized in one place with Xero integration'
        },
        {
            icon: 'briefcase',
            title: 'Job Tracking',
            description: 'Track jobs from quote to completion with real-time status updates'
        },
        {
            icon: 'file-text',
            title: 'Invoice & Quotes',
            description: 'Generate professional quotes and sync invoices directly with Xero'
        },
        {
            icon: 'calendar',
            title: 'Schedule Management',
            description: 'Plan your team\'s schedule and never miss an appointment'
        },
        {
            icon: 'bar-chart',
            title: 'Reports & Analytics',
            description: 'Get insights into your business performance with detailed reports'
        },
        {
            icon: 'message-square',
            title: 'Team Communication',
            description: 'Keep your team connected with built-in messaging'
        },
        {
            icon: 'palette',
            title: 'Custom Applications',
            description: 'Need something specific? We\'ll build it for you at no extra cost!'
        },
        {
            icon: 'shield-check',
            title: 'Australian Owned',
            description: 'Proudly Australian owned & operated with local support when you need it'
        }
    ];

    const testimonials = [
        {
            name: 'John Mitchell',
            business: 'Mitchell Plumbing Services',
            text: 'TradeCRM transformed how we manage our business. The Xero integration alone saves us hours every week!',
            rating: 5
        },
        {
            name: 'Sarah Chen',
            business: 'Chen Electrical Solutions',
            text: 'Finally, a CRM that understands trade businesses. Simple, powerful, and actually useful.',
            rating: 5
        },
        {
            name: 'Mike Roberts',
            business: 'Roberts Construction',
            text: 'We\'ve doubled our efficiency since switching to TradeCRM. Can\'t imagine running our business without it.',
            rating: 5
        }
    ];

    const integrations = [
        { name: 'Xero', icon: 'calculator', description: 'Seamless accounting integration' },
        { name: 'DocuSign', icon: 'file-signature', description: 'Digital document signing' },
        { name: 'WhatsApp Business', icon: 'message-circle', description: 'Customer messaging' },
        { name: 'Google Calendar', icon: 'calendar', description: 'Schedule synchronization' },
        { name: 'Stripe', icon: 'credit-card', description: 'Payment processing' },
        { name: 'Mailchimp', icon: 'mail', description: 'Email marketing automation' },
        { name: 'Slack', icon: 'slack', description: 'Team communication' },
        { name: 'Zapier', icon: 'zap', description: 'Workflow automation' },
        { name: 'QuickBooks', icon: 'book-open', description: 'Alternative accounting' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
            {/* Navigation */}
            <nav className={`fixed w-full z-50 transition-all duration-300 ${
                scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-4' : 'bg-transparent py-6'
            }`}>
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                            <i data-lucide="layers" className="w-6 h-6 text-white"></i>
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            StackLyft
                        </span>
                    </div>

                    <div className="flex items-center space-x-4">
                        <button 
                            onClick={navigateToLogin}
                            className="px-6 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                        >
                            Login
                        </button>
                        <button 
                            onClick={navigateToSignup}
                            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-medium"
                        >
                            Start Free Trial
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 to-purple-100/20"></div>
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>

                <div className="relative max-w-7xl mx-auto">
                    {/* Australian Badge */}
                    <div className="flex justify-center mb-6">
                        <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full border border-green-200">
                            <span className="text-2xl mr-2">🇦🇺</span>
                            <span className="font-semibold">Proudly Australian Owned & Operated</span>
                        </div>
                    </div>

                    <div className="text-center">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
                            The CRM That Adapts
                            <br />
                            <span className="text-4xl md:text-6xl">To Your Trade Business</span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-4 max-w-3xl mx-auto leading-relaxed">
                            <span className="font-bold text-gray-900">100% Customisable</span> CRM built specifically for Australian trades. 
                            Every feature, every workflow, every report - tailored exactly how you want it.
                        </p>
                        <p className="text-lg text-purple-600 font-semibold mb-8">
                            Don't see what you need? Just ask - we'll build it for FREE!
                        </p>

                        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-6">
                            <button 
                                onClick={navigateToSignup}
                                className="group px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-200 flex items-center space-x-3"
                            >
                                <span>Start Your Free 14-Day Trial</span>
                                <i data-lucide="arrow-right" className="w-5 h-5 group-hover:translate-x-1 transition-transform"></i>
                            </button>
                            <button className="px-8 py-5 bg-white/90 backdrop-blur text-gray-700 rounded-xl text-lg font-semibold border-2 border-gray-200 hover:border-blue-500 hover:text-blue-600 transition-all duration-200 flex items-center space-x-2">
                                <i data-lucide="play-circle" className="w-5 h-5"></i>
                                <span>Watch 2-Min Demo</span>
                            </button>
                        </div>

                        <div className="flex flex-wrap justify-center gap-6 text-gray-600">
                            <div className="flex items-center space-x-2">
                                <i data-lucide="zap" className="w-5 h-5 text-yellow-500"></i>
                                <span className="font-medium">Setup in 5 minutes</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <i data-lucide="sparkles" className="w-5 h-5 text-purple-500"></i>
                                <span className="font-medium">100% Customisable</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <i data-lucide="check-circle" className="w-5 h-5 text-green-500"></i>
                                <span className="font-medium">No credit card</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <i data-lucide="heart" className="w-5 h-5 text-red-500"></i>
                                <span className="font-medium">Local support</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4 text-gray-900">
                            Everything You Need to Run Your Trade Business
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            From customer management to invoicing, we've got you covered with features designed for trades
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div 
                                key={index}
                                className={`group p-8 rounded-2xl border transition-all duration-300 cursor-pointer ${
                                    feature.highlight 
                                        ? 'bg-gradient-to-br from-blue-50 to-purple-50 border-purple-200 hover:border-purple-400 hover:shadow-2xl transform hover:scale-105' 
                                        : 'bg-gradient-to-br from-white to-gray-50 border-gray-100 hover:border-blue-200 hover:shadow-xl'
                                }`}
                                style={{animationDelay: `${index * 100}ms`}}
                            >
                                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${
                                    feature.highlight 
                                        ? 'bg-gradient-to-r from-purple-600 to-pink-600' 
                                        : 'bg-gradient-to-r from-blue-600 to-purple-600'
                                }`}>
                                    <i data-lucide={feature.icon} className="w-7 h-7 text-white"></i>
                                </div>
                                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                                    {feature.title}
                                    {feature.highlight && (
                                        <span className="ml-2 px-2 py-1 bg-purple-600 text-white text-xs rounded-full">NEW</span>
                                    )}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Customisation Section */}
            <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-purple-600">
                <div className="max-w-7xl mx-auto text-center text-white">
                    <h2 className="text-4xl font-bold mb-6">
                        Your Business is Unique. Your CRM Should Be Too.
                    </h2>
                    <p className="text-xl mb-12 text-blue-100 max-w-3xl mx-auto">
                        We don't believe in one-size-fits-all. Every feature can be customised. 
                        Need something specific? Just ask and we'll build it - no extra charges, ever!
                    </p>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">
                            <i data-lucide="wand-2" className="w-12 h-12 mb-4 mx-auto"></i>
                            <h3 className="text-xl font-semibold mb-2">Custom Features</h3>
                            <p className="text-blue-100">Request any feature and we'll build it within days</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">
                            <i data-lucide="palette" className="w-12 h-12 mb-4 mx-auto"></i>
                            <h3 className="text-xl font-semibold mb-2">Your Branding</h3>
                            <p className="text-blue-100">Add your logo, colors, and make it truly yours</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">
                            <i data-lucide="code" className="w-12 h-12 mb-4 mx-auto"></i>
                            <h3 className="text-xl font-semibold mb-2">API Integration</h3>
                            <p className="text-blue-100">Connect with any tool you already use</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Analytics Showcase Section */}
            <section className="py-20 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
                                <i data-lucide="trending-up" className="w-4 h-4 mr-2"></i>
                                Real-Time Analytics
                            </div>
                            <h2 className="text-4xl font-bold mb-6 text-gray-900">
                                See Your Profits Grow in Real-Time
                            </h2>
                            <p className="text-xl text-gray-600 mb-6">
                                Track every dollar with our powerful analytics dashboard. Monitor labour markup, 
                                material costs, and profit margins at a glance.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <i data-lucide="check-circle" className="w-6 h-6 text-green-500 mr-3 mt-1"></i>
                                    <div>
                                        <strong className="text-gray-900">Labour Markup Tracking</strong>
                                        <p className="text-gray-600">See exactly how much profit you're making on labour</p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <i data-lucide="check-circle" className="w-6 h-6 text-green-500 mr-3 mt-1"></i>
                                    <div>
                                        <strong className="text-gray-900">Material Cost Analysis</strong>
                                        <p className="text-gray-600">Track material markups and optimize pricing</p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <i data-lucide="check-circle" className="w-6 h-6 text-green-500 mr-3 mt-1"></i>
                                    <div>
                                        <strong className="text-gray-900">Profit Forecasting</strong>
                                        <p className="text-gray-600">Predict future earnings based on current trends</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="relative">
                            <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900">Profit Overview</h3>
                                    <span className="text-sm text-gray-500">Last 30 days</span>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <span className="text-sm text-gray-600">Labour Profit</span>
                                            <span className="text-sm font-bold text-green-600">+32%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                            <div className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full animate-pulse" style={{width: '75%'}}></div>
                                        </div>
                                        <div className="mt-1 text-2xl font-bold text-gray-900">$24,580</div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <span className="text-sm text-gray-600">Material Profit</span>
                                            <span className="text-sm font-bold text-green-600">+28%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                            <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-3 rounded-full animate-pulse" style={{width: '65%'}}></div>
                                        </div>
                                        <div className="mt-1 text-2xl font-bold text-gray-900">$18,320</div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <span className="text-sm text-gray-600">Total Revenue</span>
                                            <span className="text-sm font-bold text-green-600">+45%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                            <div className="bg-gradient-to-r from-purple-400 to-purple-600 h-3 rounded-full animate-pulse" style={{width: '85%'}}></div>
                                        </div>
                                        <div className="mt-1 text-2xl font-bold text-gray-900">$67,450</div>
                                    </div>
                                </div>
                                <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
                                    <div className="flex items-center">
                                        <i data-lucide="trending-up" className="w-5 h-5 text-green-600 mr-2"></i>
                                        <span className="text-sm font-medium text-green-800">Profit up 45% from last month</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Communication Showcase Section */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="order-2 md:order-1 relative">
                            <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Communications</h3>
                                    <div className="space-y-3">
                                        <div className="bg-blue-50 rounded-lg p-4 transform hover:scale-105 transition-transform">
                                            <div className="flex items-start">
                                                <div className="bg-blue-500 rounded-full p-2 mr-3">
                                                    <i data-lucide="mail" className="w-4 h-4 text-white"></i>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="font-medium text-gray-900">Invoice #INV-2025-047</div>
                                                    <div className="text-sm text-gray-600">Sent to john@plumbing.com.au</div>
                                                    <div className="text-xs text-blue-600 mt-1">Delivered • 2 min ago</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-green-50 rounded-lg p-4 animate-pulse">
                                            <div className="flex items-start">
                                                <div className="bg-green-500 rounded-full p-2 mr-3">
                                                    <i data-lucide="message-circle" className="w-4 h-4 text-white"></i>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="font-medium text-gray-900">SMS: Job Update</div>
                                                    <div className="text-sm text-gray-600">"Your job is scheduled for tomorrow..."</div>
                                                    <div className="text-xs text-green-600 mt-1">Sending...</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-purple-50 rounded-lg p-4 transform hover:scale-105 transition-transform">
                                            <div className="flex items-start">
                                                <div className="bg-purple-500 rounded-full p-2 mr-3">
                                                    <i data-lucide="bell" className="w-4 h-4 text-white"></i>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="font-medium text-gray-900">Payment Reminder</div>
                                                    <div className="text-sm text-gray-600">Automated reminder scheduled</div>
                                                    <div className="text-xs text-purple-600 mt-1">Scheduled for tomorrow</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center space-x-4 pt-4 border-t">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-gray-900">2,450</div>
                                        <div className="text-xs text-gray-500">Emails Sent</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-gray-900">1,230</div>
                                        <div className="text-xs text-gray-500">SMS Sent</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-gray-900">98%</div>
                                        <div className="text-xs text-gray-500">Open Rate</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 md:order-2">
                            <div className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
                                <i data-lucide="send" className="w-4 h-4 mr-2"></i>
                                Automated Communications
                            </div>
                            <h2 className="text-4xl font-bold mb-6 text-gray-900">
                                Keep Customers in the Loop, Automatically
                            </h2>
                            <p className="text-xl text-gray-600 mb-6">
                                Send invoices, quotes, and job updates via email and SMS directly from StackLyft. 
                                Set up automated reminders and never chase payments again.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <i data-lucide="check-circle" className="w-6 h-6 text-blue-500 mr-3 mt-1"></i>
                                    <div>
                                        <strong className="text-gray-900">One-Click Invoice Sending</strong>
                                        <p className="text-gray-600">Email invoices with a single click, track when opened</p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <i data-lucide="check-circle" className="w-6 h-6 text-blue-500 mr-3 mt-1"></i>
                                    <div>
                                        <strong className="text-gray-900">SMS Job Updates</strong>
                                        <p className="text-gray-600">Keep customers informed with automated SMS updates</p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <i data-lucide="check-circle" className="w-6 h-6 text-blue-500 mr-3 mt-1"></i>
                                    <div>
                                        <strong className="text-gray-900">Smart Payment Reminders</strong>
                                        <p className="text-gray-600">Automated follow-ups for overdue invoices</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Workflow Automation Section */}
            <section className="py-20 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
                                <i data-lucide="zap" className="w-4 h-4 mr-2"></i>
                                Workflow Automation
                            </div>
                            <h2 className="text-4xl font-bold mb-6 text-gray-900">
                                From Quote to Cash, All on Autopilot
                            </h2>
                            <p className="text-xl text-gray-600 mb-6">
                                Set up your workflow once and let StackLyft handle the rest. 
                                Automatic status updates, task assignments, and deadline tracking.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <i data-lucide="check-circle" className="w-6 h-6 text-purple-500 mr-3 mt-1"></i>
                                    <div>
                                        <strong className="text-gray-900">Quote to Job Conversion</strong>
                                        <p className="text-gray-600">Automatically create jobs when quotes are accepted</p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <i data-lucide="check-circle" className="w-6 h-6 text-purple-500 mr-3 mt-1"></i>
                                    <div>
                                        <strong className="text-gray-900">Smart Task Assignment</strong>
                                        <p className="text-gray-600">Auto-assign jobs to available team members</p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <i data-lucide="check-circle" className="w-6 h-6 text-purple-500 mr-3 mt-1"></i>
                                    <div>
                                        <strong className="text-gray-900">Xero Sync</strong>
                                        <p className="text-gray-600">Invoices flow straight to Xero, no double entry</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="relative">
                            <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
                                <h3 className="text-lg font-semibold text-gray-900 mb-6">Automated Workflow</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <div className="bg-purple-500 rounded-full p-3 text-white">
                                            <i data-lucide="file-text" className="w-5 h-5"></i>
                                        </div>
                                        <div className="flex-1 mx-4">
                                            <div className="h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded animate-pulse"></div>
                                        </div>
                                        <div className="bg-gray-100 rounded-full p-3">
                                            <i data-lucide="briefcase" className="w-5 h-5 text-gray-600"></i>
                                        </div>
                                    </div>
                                    <div className="bg-purple-50 rounded-lg p-3">
                                        <div className="text-sm font-medium text-purple-900">Quote Accepted</div>
                                        <div className="text-xs text-purple-600">Automatically converting to job...</div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="bg-blue-500 rounded-full p-3 text-white">
                                            <i data-lucide="briefcase" className="w-5 h-5"></i>
                                        </div>
                                        <div className="flex-1 mx-4">
                                            <div className="h-1 bg-gradient-to-r from-blue-500 to-green-500 rounded animate-pulse"></div>
                                        </div>
                                        <div className="bg-gray-100 rounded-full p-3">
                                            <i data-lucide="check-circle" className="w-5 h-5 text-gray-600"></i>
                                        </div>
                                    </div>
                                    <div className="bg-blue-50 rounded-lg p-3">
                                        <div className="text-sm font-medium text-blue-900">Job Scheduled</div>
                                        <div className="text-xs text-blue-600">Team notified, customer updated via SMS</div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="bg-green-500 rounded-full p-3 text-white animate-pulse">
                                            <i data-lucide="check-circle" className="w-5 h-5"></i>
                                        </div>
                                        <div className="flex-1 mx-4">
                                            <div className="h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded"></div>
                                        </div>
                                        <div className="bg-emerald-500 rounded-full p-3 text-white">
                                            <i data-lucide="dollar-sign" className="w-5 h-5"></i>
                                        </div>
                                    </div>
                                    <div className="bg-green-50 rounded-lg p-3">
                                        <div className="text-sm font-medium text-green-900">Job Complete</div>
                                        <div className="text-xs text-green-600">Invoice sent, synced to Xero</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Field Operations Section */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="order-2 md:order-1 relative">
                            <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
                                <h3 className="text-lg font-semibold text-gray-900 mb-6">Live Field Operations</h3>
                                <div className="space-y-4">
                                    <div className="bg-orange-50 rounded-lg p-4 animate-pulse">
                                        <div className="flex items-start">
                                            <div className="bg-orange-500 rounded-full p-2 mr-3">
                                                <i data-lucide="map-pin" className="w-4 h-4 text-white"></i>
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-medium text-gray-900">Jake's Location</div>
                                                <div className="text-sm text-gray-600">Clocked in at 123 Main Street</div>
                                                <div className="text-xs text-orange-600 mt-1">Active • 2.5 hours</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-blue-50 rounded-lg p-4">
                                        <div className="flex items-start">
                                            <div className="bg-blue-500 rounded-full p-2 mr-3">
                                                <i data-lucide="shield-check" className="w-4 h-4 text-white"></i>
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-medium text-gray-900">Safety Check Complete</div>
                                                <div className="text-sm text-gray-600">JSA signed by Sarah Chen</div>
                                                <div className="text-xs text-blue-600 mt-1">Completed 8:30 AM</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-green-50 rounded-lg p-4">
                                        <div className="flex items-start">
                                            <div className="bg-green-500 rounded-full p-2 mr-3">
                                                <i data-lucide="receipt" className="w-4 h-4 text-white"></i>
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-medium text-gray-900">Purchase Order #PO-2047</div>
                                                <div className="text-sm text-gray-600">$247.50 at Bunnings Warehouse</div>
                                                <div className="text-xs text-green-600 mt-1">Auto-logged to Job #J-2025-089</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 bg-gray-50 rounded-xl p-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <h4 className="font-medium text-gray-900">Team Status</h4>
                                        <span className="text-xs text-gray-500">Real-time updates</span>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="text-center">
                                            <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-1 animate-pulse"></div>
                                            <div className="text-xs text-gray-600">5 Active</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="w-3 h-3 bg-orange-500 rounded-full mx-auto mb-1"></div>
                                            <div className="text-xs text-gray-600">2 Travel</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="w-3 h-3 bg-gray-300 rounded-full mx-auto mb-1"></div>
                                            <div className="text-xs text-gray-600">1 Break</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 md:order-2">
                            <div className="inline-flex items-center px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium mb-4">
                                <i data-lucide="map-pin" className="w-4 h-4 mr-2"></i>
                                Smart Field Management
                            </div>
                            <h2 className="text-4xl font-bold mb-6 text-gray-900">
                                Know Where Your Team Is, Every Moment
                            </h2>
                            <p className="text-xl text-gray-600 mb-6">
                                GPS tracking, safety compliance, and expense management all in one. 
                                Your field team stays connected and compliant from clock-in to completion.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <i data-lucide="check-circle" className="w-6 h-6 text-orange-500 mr-3 mt-1"></i>
                                    <div>
                                        <strong className="text-gray-900">GPS Clock In/Out</strong>
                                        <p className="text-gray-600">Location-verified time tracking with 30-min GPS pings</p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <i data-lucide="check-circle" className="w-6 h-6 text-orange-500 mr-3 mt-1"></i>
                                    <div>
                                        <strong className="text-gray-900">Safety Compliance</strong>
                                        <p className="text-gray-600">Digital JSA signing required before job start</p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <i data-lucide="check-circle" className="w-6 h-6 text-orange-500 mr-3 mt-1"></i>
                                    <div>
                                        <strong className="text-gray-900">Smart Purchase Orders</strong>
                                        <p className="text-gray-600">Generate POs on-site, auto-log expenses to jobs</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Lead Analytics Section */}
            <section className="py-20 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
                                <i data-lucide="users" className="w-4 h-4 mr-2"></i>
                                Lead Intelligence
                            </div>
                            <h2 className="text-4xl font-bold mb-6 text-gray-900">
                                Turn Leads Into Loyal Customers
                            </h2>
                            <p className="text-xl text-gray-600 mb-6">
                                Track every lead from first contact to signed contract. See which marketing channels 
                                work best and optimize your sales process with detailed conversion analytics.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <i data-lucide="check-circle" className="w-6 h-6 text-purple-500 mr-3 mt-1"></i>
                                    <div>
                                        <strong className="text-gray-900">Lead Source Tracking</strong>
                                        <p className="text-gray-600">Know exactly which marketing brings the best customers</p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <i data-lucide="check-circle" className="w-6 h-6 text-purple-500 mr-3 mt-1"></i>
                                    <div>
                                        <strong className="text-gray-900">Conversion Analytics</strong>
                                        <p className="text-gray-600">Track time-to-close and identify bottlenecks</p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <i data-lucide="check-circle" className="w-6 h-6 text-purple-500 mr-3 mt-1"></i>
                                    <div>
                                        <strong className="text-gray-900">Auto Follow-Up Sequences</strong>
                                        <p className="text-gray-600">Never lose a lead with automated nurture campaigns</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="relative">
                            <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900">Lead Analytics Dashboard</h3>
                                    <span className="text-sm text-gray-500">This month</span>
                                </div>
                                <div className="space-y-4">
                                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium text-gray-700">Google Ads</span>
                                            <span className="text-lg font-bold text-purple-600">47%</span>
                                        </div>
                                        <div className="w-full bg-white rounded-full h-2 overflow-hidden">
                                            <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full animate-pulse" style={{width: '78%'}}></div>
                                        </div>
                                        <div className="mt-2 flex justify-between text-xs text-gray-600">
                                            <span>89 leads</span>
                                            <span>42 conversions</span>
                                        </div>
                                    </div>
                                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium text-gray-700">Referrals</span>
                                            <span className="text-lg font-bold text-green-600">72%</span>
                                        </div>
                                        <div className="w-full bg-white rounded-full h-2 overflow-hidden">
                                            <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full animate-pulse" style={{width: '91%'}}></div>
                                        </div>
                                        <div className="mt-2 flex justify-between text-xs text-gray-600">
                                            <span>35 leads</span>
                                            <span>25 conversions</span>
                                        </div>
                                    </div>
                                    <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium text-gray-700">Social Media</span>
                                            <span className="text-lg font-bold text-orange-600">31%</span>
                                        </div>
                                        <div className="w-full bg-white rounded-full h-2 overflow-hidden">
                                            <div className="bg-gradient-to-r from-orange-500 to-yellow-500 h-2 rounded-full" style={{width: '45%'}}></div>
                                        </div>
                                        <div className="mt-2 flex justify-between text-xs text-gray-600">
                                            <span>52 leads</span>
                                            <span>16 conversions</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 p-4 bg-purple-50 rounded-xl border border-purple-200">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-sm font-medium text-purple-900">Average Close Time</div>
                                            <div className="text-2xl font-bold text-purple-700">8.5 days</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm font-medium text-purple-900">Total Value</div>
                                            <div className="text-2xl font-bold text-purple-700">$127k</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Voice AI Section */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="order-2 md:order-1 relative">
                            <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-100 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full transform translate-x-16 -translate-y-16"></div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-6 relative z-10">AI Voice Assistant</h3>
                                <div className="space-y-4">
                                    <div className="bg-blue-50 rounded-lg p-4 relative">
                                        <div className="flex items-center mb-3">
                                            <div className="bg-blue-500 rounded-full p-2 mr-3 animate-pulse">
                                                <i data-lucide="mic" className="w-4 h-4 text-white"></i>
                                            </div>
                                            <div className="font-medium text-gray-900">Recording active...</div>
                                        </div>
                                        <div className="bg-white rounded-lg p-3 mb-3">
                                            <div className="text-sm text-gray-600 italic">"Customer wants additional power points in the kitchen and garage. Mentioned they're planning a renovation next month. Suggest we quote for the full electrical upgrade."</div>
                                        </div>
                                        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg p-3 text-white">
                                            <div className="text-sm font-medium mb-2">AI Generated Summary:</div>
                                            <div className="text-sm">
                                                • Quote additional power points<br/>
                                                • Upsell opportunity: Full electrical upgrade<br/>
                                                • Follow-up timing: Next month renovation<br/>
                                                • Customer priority: Kitchen & garage
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-green-50 rounded-lg p-4">
                                        <div className="flex items-center">
                                            <div className="bg-green-500 rounded-full p-2 mr-3">
                                                <i data-lucide="check-circle" className="w-4 h-4 text-white"></i>
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-900">Auto-saved to customer file</div>
                                                <div className="text-sm text-gray-600">Reminder set for renovation follow-up</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 flex items-center justify-center">
                                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-4 animate-bounce">
                                        <i data-lucide="brain" className="w-8 h-8 text-white"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 md:order-2">
                            <div className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
                                <i data-lucide="brain" className="w-4 h-4 mr-2"></i>
                                AI Voice Notes
                            </div>
                            <h2 className="text-4xl font-bold mb-6 text-gray-900">
                                Speak Your Notes, AI Does the Rest
                            </h2>
                            <p className="text-xl text-gray-600 mb-6">
                                While on-site, just speak into your phone or tablet. Our AI instantly converts your voice 
                                into organized notes, action items, and follow-up reminders - all saved to the customer file.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <i data-lucide="check-circle" className="w-6 h-6 text-blue-500 mr-3 mt-1"></i>
                                    <div>
                                        <strong className="text-gray-900">Instant Voice Transcription</strong>
                                        <p className="text-gray-600">Speak naturally, AI captures every important detail</p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <i data-lucide="check-circle" className="w-6 h-6 text-blue-500 mr-3 mt-1"></i>
                                    <div>
                                        <strong className="text-gray-900">Smart Action Items</strong>
                                        <p className="text-gray-600">AI identifies tasks, deadlines, and follow-ups automatically</p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <i data-lucide="check-circle" className="w-6 h-6 text-blue-500 mr-3 mt-1"></i>
                                    <div>
                                        <strong className="text-gray-900">Upsell Recognition</strong>
                                        <p className="text-gray-600">Spots opportunities and suggests additional services</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4 text-gray-900">
                            Simple, Fair Pricing
                        </h2>
                        <p className="text-xl text-gray-600">
                            Everything you need to run your trade business. No hidden fees, no surprises.
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 border-2 border-blue-200 relative">
                            {/* Popular Badge */}
                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
                                    Most Popular
                                </div>
                            </div>

                            <div className="text-center mb-8">
                                <h3 className="text-3xl font-bold text-gray-900 mb-4">Complete Trade CRM</h3>
                                <div className="flex items-baseline justify-center mb-4">
                                    <span className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">$45</span>
                                    <span className="text-xl text-gray-600 ml-2">per user/month</span>
                                </div>
                                <p className="text-gray-600 text-lg">Training included • No setup fees • Cancel anytime</p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Lead Management */}
                                <div className="space-y-3">
                                    <h4 className="font-semibold text-gray-900 text-lg mb-3 flex items-center">
                                        <i data-lucide="users" className="w-5 h-5 text-blue-600 mr-2"></i>
                                        Lead Management
                                    </h4>
                                    <div className="space-y-2">
                                        <div className="flex items-start">
                                            <i data-lucide="check" className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"></i>
                                            <span className="text-gray-700 text-sm">Lead to customer conversion tracking</span>
                                        </div>
                                        <div className="flex items-start">
                                            <i data-lucide="check" className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"></i>
                                            <span className="text-gray-700 text-sm">Full lead history and analytics</span>
                                        </div>
                                        <div className="flex items-start">
                                            <i data-lucide="check" className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"></i>
                                            <span className="text-gray-700 text-sm">Auto follow-ups on quotes</span>
                                        </div>
                                        <div className="flex items-start">
                                            <i data-lucide="check" className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"></i>
                                            <span className="text-gray-700 text-sm">Marketing insights & analytics</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Smart Features */}
                                <div className="space-y-3">
                                    <h4 className="font-semibold text-gray-900 text-lg mb-3 flex items-center">
                                        <i data-lucide="brain" className="w-5 h-5 text-purple-600 mr-2"></i>
                                        Smart Features
                                    </h4>
                                    <div className="space-y-2">
                                        <div className="flex items-start">
                                            <i data-lucide="check" className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"></i>
                                            <span className="text-gray-700 text-sm">AI-generated emails</span>
                                        </div>
                                        <div className="flex items-start">
                                            <i data-lucide="check" className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"></i>
                                            <span className="text-gray-700 text-sm">Upsell prompts for sales team</span>
                                        </div>
                                        <div className="flex items-start">
                                            <i data-lucide="check" className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"></i>
                                            <span className="text-gray-700 text-sm">Auto email confirmations</span>
                                        </div>
                                        <div className="flex items-start">
                                            <i data-lucide="check" className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"></i>
                                            <span className="text-gray-700 text-sm">Recurring job automation</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Field Operations */}
                                <div className="space-y-3">
                                    <h4 className="font-semibold text-gray-900 text-lg mb-3 flex items-center">
                                        <i data-lucide="map-pin" className="w-5 h-5 text-orange-600 mr-2"></i>
                                        Field Operations
                                    </h4>
                                    <div className="space-y-2">
                                        <div className="flex items-start">
                                            <i data-lucide="check" className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"></i>
                                            <span className="text-gray-700 text-sm">GPS clock in/out with location check</span>
                                        </div>
                                        <div className="flex items-start">
                                            <i data-lucide="check" className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"></i>
                                            <span className="text-gray-700 text-sm">Worker tracker (30min GPS pings)</span>
                                        </div>
                                        <div className="flex items-start">
                                            <i data-lucide="check" className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"></i>
                                            <span className="text-gray-700 text-sm">JSA document signing</span>
                                        </div>
                                        <div className="flex items-start">
                                            <i data-lucide="check" className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"></i>
                                            <span className="text-gray-700 text-sm">Auto timesheet logging</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Business Management */}
                                <div className="space-y-3">
                                    <h4 className="font-semibold text-gray-900 text-lg mb-3 flex items-center">
                                        <i data-lucide="briefcase" className="w-5 h-5 text-green-600 mr-2"></i>
                                        Business Management
                                    </h4>
                                    <div className="space-y-2">
                                        <div className="flex items-start">
                                            <i data-lucide="check" className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"></i>
                                            <span className="text-gray-700 text-sm">Customer, employee, site management</span>
                                        </div>
                                        <div className="flex items-start">
                                            <i data-lucide="check" className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"></i>
                                            <span className="text-gray-700 text-sm">Invoice document scanning</span>
                                        </div>
                                        <div className="flex items-start">
                                            <i data-lucide="check" className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"></i>
                                            <span className="text-gray-700 text-sm">DocuSign integration</span>
                                        </div>
                                        <div className="flex items-start">
                                            <i data-lucide="check" className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"></i>
                                            <span className="text-gray-700 text-sm">Schedule management</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Communications */}
                                <div className="space-y-3">
                                    <h4 className="font-semibold text-gray-900 text-lg mb-3 flex items-center">
                                        <i data-lucide="message-square" className="w-5 h-5 text-blue-600 mr-2"></i>
                                        Communications
                                    </h4>
                                    <div className="space-y-2">
                                        <div className="flex items-start">
                                            <i data-lucide="check" className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"></i>
                                            <span className="text-gray-700 text-sm">Internal Slack-like messaging</span>
                                        </div>
                                        <div className="flex items-start">
                                            <i data-lucide="check" className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"></i>
                                            <span className="text-gray-700 text-sm">External messenger (FB, text, IG, email)</span>
                                        </div>
                                        <div className="flex items-start">
                                            <i data-lucide="check" className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"></i>
                                            <span className="text-gray-700 text-sm">SMS job reminders & confirmations</span>
                                        </div>
                                        <div className="flex items-start">
                                            <i data-lucide="check" className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"></i>
                                            <span className="text-gray-700 text-sm">Create customers from messages</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Quoting & Analytics */}
                                <div className="space-y-3">
                                    <h4 className="font-semibold text-gray-900 text-lg mb-3 flex items-center">
                                        <i data-lucide="file-text" className="w-5 h-5 text-purple-600 mr-2"></i>
                                        Quoting & Analytics
                                    </h4>
                                    <div className="space-y-2">
                                        <div className="flex items-start">
                                            <i data-lucide="check" className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"></i>
                                            <span className="text-gray-700 text-sm">Take-off templates with saved costs</span>
                                        </div>
                                        <div className="flex items-start">
                                            <i data-lucide="check" className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"></i>
                                            <span className="text-gray-700 text-sm">Auto material & labour markups</span>
                                        </div>
                                        <div className="flex items-start">
                                            <i data-lucide="check" className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"></i>
                                            <span className="text-gray-700 text-sm">Extensive reports & AI insights</span>
                                        </div>
                                        <div className="flex items-start">
                                            <i data-lucide="check" className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"></i>
                                            <span className="text-gray-700 text-sm">PO management for suppliers</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 text-center">
                                <button 
                                    onClick={() => setShowPopup(true)}
                                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                                >
                                    Start Your Free Trial
                                </button>
                                <p className="text-sm text-gray-500 mt-3">
                                    ✓ Full training included  ✓ No setup fees  ✓ Cancel anytime
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full border border-green-200 mb-4">
                            <span className="text-xl mr-2">🇦🇺</span>
                            <span className="font-semibold">Built by Aussie Developers for Aussie Trades</span>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">Why Trade Businesses Choose StackLyft</h2>
                    </div>
                    <div className="grid md:grid-cols-5 gap-8 text-center">
                        <div className="group hover:scale-110 transition-transform">
                            <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">99.9%</div>
                            <div className="text-gray-600 font-medium">Uptime Reliability</div>
                        </div>
                        <div className="group hover:scale-110 transition-transform">
                            <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">5 Min</div>
                            <div className="text-gray-600 font-medium">Setup Time</div>
                        </div>
                        <div className="group hover:scale-110 transition-transform">
                            <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">100%</div>
                            <div className="text-gray-600 font-medium">Customisable</div>
                        </div>
                        <div className="group hover:scale-110 transition-transform">
                            <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">24/7</div>
                            <div className="text-gray-600 font-medium">Local Support</div>
                        </div>
                        <div className="group hover:scale-110 transition-transform">
                            <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">FREE</div>
                            <div className="text-gray-600 font-medium">Custom Features</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Launch Countdown Section */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-4 text-gray-900">
                        StackLyft Launches In
                    </h2>
                    <p className="text-xl text-gray-600 mb-12">
                        Be among the first to transform your trade business
                    </p>

                    {/* Countdown Timer */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-2xl mx-auto">
                        <div className="text-center">
                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-6 shadow-lg">
                                <div className="text-4xl font-bold mb-2">{timeLeft.days || '21'}</div>
                                <div className="text-blue-100 text-sm uppercase tracking-wide">Days</div>
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-6 shadow-lg">
                                <div className="text-4xl font-bold mb-2">{timeLeft.hours || '0'}</div>
                                <div className="text-blue-100 text-sm uppercase tracking-wide">Hours</div>
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-6 shadow-lg">
                                <div className="text-4xl font-bold mb-2">{timeLeft.minutes || '0'}</div>
                                <div className="text-blue-100 text-sm uppercase tracking-wide">Minutes</div>
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-6 shadow-lg animate-pulse">
                                <div className="text-4xl font-bold mb-2">{timeLeft.seconds || '0'}</div>
                                <div className="text-blue-100 text-sm uppercase tracking-wide">Seconds</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Get Early Access Now</h3>
                        <p className="text-gray-600 mb-6">Join the waiting list and be the first to experience the CRM built for Australian trades</p>
                        <button 
                            onClick={() => setShowPopup(true)}
                            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                        >
                            Reserve Your Spot
                        </button>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-purple-600">
                <div className="max-w-4xl mx-auto text-center text-white">
                    <h2 className="text-4xl font-bold mb-6">
                        Ready to Transform Your Trade Business?
                    </h2>
                    <p className="text-xl mb-8 text-blue-100">
                        Join hundreds of Australian trade businesses already using TradeCRM
                    </p>
                    <button 
                        onClick={navigateToSignup}
                        className="px-8 py-4 bg-white text-blue-600 rounded-xl text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
                    >
                        Start Your Free Trial Today
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-16 px-6 bg-gray-900 text-gray-400">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                    <i data-lucide="layers" className="w-6 h-6 text-white"></i>
                                </div>
                                <span className="text-xl font-bold text-white">StackLyft</span>
                            </div>
                            <p className="text-sm">The CRM that adapts to your trade business.</p>
                            <div className="flex items-center mt-4 space-x-2">
                                <span className="text-2xl">🇦🇺</span>
                                <span className="text-sm">Proudly Australian</span>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Product</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-white transition">Features</a></li>
                                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                                <li><a href="#" className="hover:text-white transition">Integrations</a></li>
                                <li><a href="#" className="hover:text-white transition">Custom Solutions</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Support</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-white transition">Help Center</a></li>
                                <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
                                <li><a href="#" className="hover:text-white transition">Status</a></li>
                                <li><a href="#" className="hover:text-white transition">API Docs</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Company</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                                <li><a href="#" className="hover:text-white transition">Careers</a></li>
                                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 pt-8 text-center">
                        <p className="text-sm">&copy; 2025 StackLyft. All rights reserved. Built with ❤️ in Sydney, Australia.</p>
                        <div className="flex justify-center space-x-4 mt-4">
                            <a href="#" className="hover:text-white transition"><i data-lucide="facebook" className="w-5 h-5"></i></a>
                            <a href="#" className="hover:text-white transition"><i data-lucide="twitter" className="w-5 h-5"></i></a>
                            <a href="#" className="hover:text-white transition"><i data-lucide="linkedin" className="w-5 h-5"></i></a>
                            <a href="#" className="hover:text-white transition"><i data-lucide="instagram" className="w-5 h-5"></i></a>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Launch Countdown Popup */}
            {showPopup && (
                <div 
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            setShowPopup(false);
                        }
                    }}
                >
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-in fade-in-0 zoom-in-95 duration-300">
                        <button 
                            onClick={() => setShowPopup(false)}
                            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-800 transition-all duration-200 text-xl font-semibold"
                        >
                            ✕
                        </button>

                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i data-lucide="layers" className="w-8 h-8 text-white"></i>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">We're Almost Ready!</h3>
                            <p className="text-gray-600">StackLyft launches in:</p>
                        </div>

                        {/* Countdown Timer */}
                        <div className="grid grid-cols-4 gap-4 mb-8">
                            <div className="text-center">
                                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-3 font-bold text-xl">
                                    {timeLeft.days || '0'}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">Days</div>
                            </div>
                            <div className="text-center">
                                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-3 font-bold text-xl">
                                    {timeLeft.hours || '0'}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">Hours</div>
                            </div>
                            <div className="text-center">
                                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-3 font-bold text-xl">
                                    {timeLeft.minutes || '0'}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">Minutes</div>
                            </div>
                            <div className="text-center">
                                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-3 font-bold text-xl">
                                    {timeLeft.seconds || '0'}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">Seconds</div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Your Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                    placeholder="John Smith"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Business Name *</label>
                                <input
                                    type="text"
                                    name="business"
                                    value={formData.business}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                    placeholder="Smith Plumbing Services"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                    placeholder="john@smithplumbing.com.au"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Tell us about your business</label>
                                <textarea
                                    name="extraInfo"
                                    value={formData.extraInfo}
                                    onChange={handleInputChange}
                                    rows={3}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                                    placeholder="Team size, main services, current challenges..."
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                            >
                                Get Early Access
                            </button>
                        </form>

                        <p className="text-xs text-gray-500 text-center mt-4">
                            We'll be in touch within 24 hours to discuss your needs and set up your custom StackLyft system.
                        </p>
                    </div>
                </div>
            )}

            {/* Success Popup */}
            {showSuccess && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 text-center animate-in fade-in-0 zoom-in-95 duration-300">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i data-lucide="check" className="w-8 h-8 text-green-600"></i>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                        <p className="text-gray-600 mb-4">We'll be in touch soon to discuss your StackLyft setup.</p>
                        <div className="text-sm text-gray-500">This popup will close automatically</div>
                    </div>
                </div>
            )}
        </div>
    );
};

window.Landing = Landing