# Cursor Rules Precedence System

## Overview
This directory contains streamlined development rules for React + TypeScript + Vite business websites. The rules focus on practical patterns that work for any small-medium business, with simple conflict resolution and clear priorities.

---

## 1.1 🚀 .cursor Quick Reference

### **Essential Rules (Must Follow)**
```
📂 BUSINESS DATA: Always import from `businessInfo.ts` - never hard-code
🔧 TYPESCRIPT: Strict mode, named exports, proper types
⚛️ COMPONENTS: CSS Modules, semantic HTML, error boundaries
🎨 STYLES: Design tokens from globals.css, mobile-first responsive
🔒 SECURITY: Input validation, XSS prevention for customer data
```

### **Quick Decision Making**
| **Conflict** | **Winner** | **Why** |
|--------------|------------|---------|
| Business vs Technical | Business | Customer needs drive decisions |
| Security vs UX | Security | Customer data protection |
| Accessibility vs Design | Accessibility | Legal compliance |
| Performance vs Type Safety | Both | Find solution satisfying both |

### **Common Patterns**
```typescript
// ✅ Business data integration
import { businessInfo } from '@/data/businessInfo';
const hero = `${businessInfo.name} - ${businessInfo.tagline}`;

// ✅ Component structure
export const BusinessCard: React.FC<BusinessCardProps> = ({ className }) => {
  return (
    <div className={`${styles.card} ${className || ''}`}>
      {/* Component content */}
    </div>
  );
};

// ✅ Error handling
const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Handle states properly
};
```

### **File Organization**
```
src/
├── components/ComponentName/
│   ├── ComponentName.tsx
│   ├── ComponentName.module.css
│   └── index.ts (barrel export)
├── data/businessInfo.ts (single source of truth)
└── styles/globals.css (design tokens)
```

### **Before You Code Checklist**
- [ ] BusinessInfo imported (not hard-coded)
- [ ] TypeScript strict compliance
- [ ] CSS design tokens used
- [ ] Semantic HTML elements
- [ ] Error states handled
- [ ] Responsive breakpoints followed

---

## 2. 📋 Rule System Overview

### **Core Rules (Must Follow)**
| **Rule** | **Purpose** | **Status** |
|----------|-------------|------------|
| `.cursorrules` | Business context & architecture | ✅ Active |
| `companyInformationIntegration.mdc` | Business data patterns | ✅ Active |
| `typescript-standards.mdc` | TypeScript patterns | ✅ Active |
| `react-component-standards.mdc` | Component architecture | ✅ Active |
| `css-design-system.mdc` | Design tokens & styling | ✅ Active |

### **Supporting Rules (Nice to Have)**
| **Rule** | **Purpose** | **Status** |
|----------|-------------|------------|
| `responsive-breakpoints.mdc` | Breakpoint definitions | ✅ Active |
| `git-conventional-commits.mdc` | Commit message format | ✅ Active |
| `performance-error-handling.mdc` | Performance & errors | ✅ Active |
| `business-context.mdc` | Business patterns | ✅ Active |
| Others | Various specialized rules | ⚠️ Stub files |

### **Simple Rule Priority**
```
1. BUSINESS NEEDS (Customer requirements win)
2. SECURITY (Customer data protection)  
3. ACCESSIBILITY (Legal compliance)
4. TYPESCRIPT (Code safety)
5. EVERYTHING ELSE (Performance, styling, etc.)
```

### **When Rules Conflict**
- **Business vs Technical**: Business wins
- **Security vs UX**: Security wins  
- **Accessibility vs Design**: Accessibility wins
- **Need to break a rule**: Document why in code comments

---

## 3. 🛠️ Using the Rules

### **Common Development Tasks**

#### **Creating a New Component**
```bash
# 1. Use business data
import { businessInfo } from '@/data/businessInfo';

# 2. Follow file structure  
src/components/ContactForm/
├── ContactForm.tsx
├── ContactForm.module.css
└── index.ts

# 3. Use TypeScript properly
interface ContactFormProps {
  onSubmit: (data: ContactData) => void;
}
```

#### **Handling Rule Conflicts**
```typescript
// When business needs override technical rules
const BusinessHeader = () => {
  // RULE OVERRIDE: Using brand colors instead of design tokens
  // REASON: Brand identity requirement from client
  const brandColor = businessInfo.brandColors.primary; // ✅ Documented override
  
  return <header style={{ backgroundColor: brandColor }}>...</header>;
};
```

#### **Quick Validation**
```bash
# Before committing, check:
- [ ] Business data imported from businessInfo.ts
- [ ] No hard-coded business details
- [ ] TypeScript errors resolved
- [ ] CSS uses design tokens (or documented override)
- [ ] Component has error handling
```

### **Getting Help**
- **Rule conflicts**: Check section 2 priority list
- **Common problems**: See [troubleshooting-guide.mdc](troubleshooting-guide.mdc)
- **Component templates**: Use [component-templates.mdc](component-templates.mdc) for ready-to-use components
- **Rule validation**: Run `npm run validate-rules:quick` for fast checks
- **Missing patterns**: Look at existing components for examples  
- **Breaking rules**: Document why in code comments
- **Questions**: Check individual .mdc files for details

---

**Last Updated:** 2025-01-27  
**Version:** 5.0.0 - Streamlined Business Rules  
**Status:** ✅ Ready for Small-Medium Business Development  
**Focus:** Practical patterns for any business type 