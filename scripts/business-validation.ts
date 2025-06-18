#!/usr/bin/env node

/**
 * Business Validation Script
 * 
 * Validates that rules properly support business website development:
 * - Business data integration patterns
 * - Customer-focused component guidance
 * - SMB-appropriate patterns
 * - No industry-specific bloat
 */

import { promises as fs } from 'fs';
import path from 'path';

interface BusinessValidationResult {
  success: boolean;
  businessScore: number;
  issues: BusinessIssue[];
  recommendations: string[];
  smbReadiness: 'excellent' | 'good' | 'needs-work' | 'poor';
}

interface BusinessIssue {
  type: 'error' | 'warning' | 'info';
  category: 'data-integration' | 'customer-focus' | 'industry-bloat' | 'smb-patterns';
  file: string;
  description: string;
  businessImpact: string;
  fix: string;
}

class BusinessValidator {
  private readonly rulesDir = '.cursor/rules';
  private readonly businessCriticalFiles = [
    'companyInformationIntegration.mdc',
    'component-templates.mdc',
    'business-context.mdc'
  ];

  async validateBusinessAlignment(): Promise<BusinessValidationResult> {
    console.log('🏢 Running business alignment validation...\n');

    const issues: BusinessIssue[] = [];
    let businessScore = 100;

    try {
      // 1. Check business data integration
      console.log('📊 Validating business data integration...');
      const dataIssues = await this.validateDataIntegration();
      issues.push(...dataIssues);

      // 2. Check customer focus
      console.log('👥 Validating customer focus...');
      const customerIssues = await this.validateCustomerFocus();
      issues.push(...customerIssues);

      // 3. Check for industry bloat
      console.log('🧹 Checking for industry-specific bloat...');
      const bloatIssues = await this.checkIndustryBloat();
      issues.push(...bloatIssues);

      // 4. Validate SMB patterns
      console.log('🏪 Validating SMB-appropriate patterns...');
      const smbIssues = await this.validateSMBPatterns();
      issues.push(...smbIssues);

      // Calculate business score
      businessScore = this.calculateBusinessScore(issues);
      
      // Generate recommendations
      const recommendations = this.generateBusinessRecommendations(issues);
      
      // Assess SMB readiness
      const smbReadiness = this.assessSMBReadiness(businessScore, issues);

      const success = businessScore >= 80 && !issues.some(i => i.type === 'error');

      console.log(`\n${success ? '✅' : '❌'} Business validation complete!`);
      console.log(`🏢 Business Score: ${businessScore}/100`);
      console.log(`🏪 SMB Readiness: ${smbReadiness.toUpperCase()}`);

      return {
        success,
        businessScore,
        issues,
        recommendations,
        smbReadiness
      };

    } catch (error) {
      console.error('❌ Business validation failed:', error.message);
      return {
        success: false,
        businessScore: 0,
        issues: [{
          type: 'error',
          category: 'data-integration',
          file: 'validation-system',
          description: `Business validation system error: ${error.message}`,
          businessImpact: 'Cannot ensure business alignment',
          fix: 'Fix validation system errors'
        }],
        recommendations: ['Fix validation system and retry'],
        smbReadiness: 'poor'
      };
    }
  }

  private async validateDataIntegration(): Promise<BusinessIssue[]> {
    const issues: BusinessIssue[] = [];

    // Check business integration rule
    try {
      const businessRulePath = path.join(this.rulesDir, 'companyInformationIntegration.mdc');
      const content = await fs.readFile(businessRulePath, 'utf-8');

      // Must enforce businessInfo.ts pattern
      if (!content.includes('businessInfo.ts')) {
        issues.push({
          type: 'error',
          category: 'data-integration',
          file: 'companyInformationIntegration.mdc',
          description: 'Missing businessInfo.ts single source of truth pattern',
          businessImpact: 'Developers may hard-code business data, making updates difficult',
          fix: 'Add clear businessInfo.ts integration patterns and examples'
        });
      }

      // Must prohibit hard-coding
      if (!content.includes('hard-cod') && !content.includes('never hard-code')) {
        issues.push({
          type: 'warning',
          category: 'data-integration',
          file: 'companyInformationIntegration.mdc',
          description: 'Should explicitly prohibit hard-coding business data',
          businessImpact: 'Risk of scattered business data across codebase',
          fix: 'Add explicit guidance against hard-coding business details'
        });
      }

      // Check for import examples
      if (!content.includes('import') || !content.includes('businessInfo')) {
        issues.push({
          type: 'warning',
          category: 'data-integration',
          file: 'companyInformationIntegration.mdc',
          description: 'Missing practical import examples',
          businessImpact: 'Developers may not know how to properly integrate business data',
          fix: 'Add clear import and usage examples'
        });
      }

    } catch (error) {
      issues.push({
        type: 'error',
        category: 'data-integration',
        file: 'companyInformationIntegration.mdc',
        description: 'Business data integration rule file missing or unreadable',
        businessImpact: 'No guidance for business data integration',
        fix: 'Create comprehensive business data integration rule'
      });
    }

    // Check component templates for business integration
    try {
      const templatesPath = path.join(this.rulesDir, 'component-templates.mdc');
      const templatesContent = await fs.readFile(templatesPath, 'utf-8');

      if (!templatesContent.includes('businessInfo')) {
        issues.push({
          type: 'error',
          category: 'data-integration',
          file: 'component-templates.mdc',
          description: 'Component templates don\'t demonstrate business data integration',
          businessImpact: 'Developers will create components without business context',
          fix: 'Update all component templates to use businessInfo patterns'
        });
      }

      // Check for business-specific components
      const businessComponents = ['BusinessHeader', 'ContactForm', 'BusinessCard'];
      const missingComponents = businessComponents.filter(comp => 
        !templatesContent.includes(comp)
      );

      if (missingComponents.length > 0) {
        issues.push({
          type: 'warning',
          category: 'smb-patterns',
          file: 'component-templates.mdc',
          description: `Missing essential business components: ${missingComponents.join(', ')}`,
          businessImpact: 'Developers lack templates for common business website needs',
          fix: 'Add templates for essential business website components'
        });
      }

    } catch (error) {
      issues.push({
        type: 'warning',
        category: 'data-integration',
        file: 'component-templates.mdc',
        description: 'Component templates file missing - no business integration examples',
        businessImpact: 'Developers lack practical business integration examples',
        fix: 'Create component templates with business data integration'
      });
    }

    return issues;
  }

  private async validateCustomerFocus(): Promise<BusinessIssue[]> {
    const issues: BusinessIssue[] = [];
    const ruleFiles = await this.getRuleFiles();

    let customerFocusCount = 0;
    let businessValueCount = 0;

    for (const file of ruleFiles) {
      try {
        const content = await fs.readFile(path.join(this.rulesDir, file), 'utf-8');
        
        // Check for customer-focused language
        const customerTerms = ['customer', 'client', 'visitor', 'user experience', 'conversion'];
        const hasCustomerFocus = customerTerms.some(term => 
          content.toLowerCase().includes(term.toLowerCase())
        );

        if (hasCustomerFocus) {
          customerFocusCount++;
        }

        // Check for business value language
        const businessTerms = ['business', 'revenue', 'sales', 'leads', 'conversion', 'ROI'];
        const hasBusinessValue = businessTerms.some(term => 
          content.toLowerCase().includes(term.toLowerCase())
        );

        if (hasBusinessValue) {
          businessValueCount++;
        }

        // Specific checks for core files
        if (this.businessCriticalFiles.includes(file)) {
          if (!hasCustomerFocus && !hasBusinessValue) {
            issues.push({
              type: 'warning',
              category: 'customer-focus',
              file,
              description: 'Critical business file lacks customer/business value context',
              businessImpact: 'Rules may not drive customer-focused development',
              fix: 'Add customer impact and business value explanations'
            });
          }
        }

      } catch (error) {
        // Skip unreadable files
      }
    }

    // Overall customer focus assessment
    const totalFiles = ruleFiles.length;
    const customerFocusRatio = customerFocusCount / totalFiles;
    
    if (customerFocusRatio < 0.3) {
      issues.push({
        type: 'warning',
        category: 'customer-focus',
        file: 'overall-system',
        description: 'Low customer focus across rule system',
        businessImpact: 'Rules may not emphasize customer value creation',
        fix: 'Add customer impact context to more rules'
      });
    }

    return issues;
  }

  private async checkIndustryBloat(): Promise<BusinessIssue[]> {
    const issues: BusinessIssue[] = [];
    const ruleFiles = await this.getRuleFiles();

    // Industry-specific terms that indicate bloat
    const industryTerms = [
      'restaurant', 'brewery', 'consulting', 'retail',
      'menu', 'beer', 'tasting', 'reservation',
      'case study', 'portfolio', 'expertise'
    ];

    for (const file of ruleFiles) {
      try {
        const content = await fs.readFile(path.join(this.rulesDir, file), 'utf-8');
        
        const foundTerms = industryTerms.filter(term => 
          content.toLowerCase().includes(term.toLowerCase())
        );

        if (foundTerms.length > 2) {
          issues.push({
            type: 'warning',
            category: 'industry-bloat',
            file,
            description: `Contains industry-specific terminology: ${foundTerms.join(', ')}`,
            businessImpact: 'Rule may not be applicable to all small-medium businesses',
            fix: 'Replace industry-specific examples with generic business patterns'
          });
        }

        // Check for overly specific component examples
        if (content.includes('MenuSection') || content.includes('BeerCard') || content.includes('CaseStudyCard')) {
          issues.push({
            type: 'info',
            category: 'industry-bloat',
            file,
            description: 'Contains industry-specific component examples',
            businessImpact: 'May confuse developers working on different business types',
            fix: 'Use generic business component examples (ServiceCard, ProductCard, etc.)'
          });
        }

      } catch (error) {
        // Skip unreadable files
      }
    }

    return issues;
  }

  private async validateSMBPatterns(): Promise<BusinessIssue[]> {
    const issues: BusinessIssue[] = [];

    // Check for SMB-appropriate patterns
    const smbPatterns = [
      'contact form', 'business hours', 'location', 'services',
      'about', 'testimonial', 'phone', 'email', 'address'
    ];

    try {
      const templatesPath = path.join(this.rulesDir, 'component-templates.mdc');
      const content = await fs.readFile(templatesPath, 'utf-8');

      const foundPatterns = smbPatterns.filter(pattern => 
        content.toLowerCase().includes(pattern.toLowerCase())
      );

      if (foundPatterns.length < 5) {
        issues.push({
          type: 'warning',
          category: 'smb-patterns',
          file: 'component-templates.mdc',
          description: 'Missing common SMB website patterns',
          businessImpact: 'Templates may not cover essential small business needs',
          fix: 'Add more SMB-focused component templates and patterns'
        });
      }

      // Check for accessibility (important for SMBs)
      if (!content.includes('accessibility') && !content.includes('aria') && !content.includes('semantic')) {
        issues.push({
          type: 'warning',
          category: 'smb-patterns',
          file: 'component-templates.mdc',
          description: 'Templates lack accessibility guidance',
          businessImpact: 'SMB websites may not be accessible to all customers',
          fix: 'Add accessibility best practices to component templates'
        });
      }

      // Check for mobile responsiveness
      if (!content.includes('responsive') && !content.includes('mobile')) {
        issues.push({
          type: 'warning',
          category: 'smb-patterns',
          file: 'component-templates.mdc',
          description: 'Templates lack mobile responsiveness guidance',
          businessImpact: 'SMB websites may not work well on mobile devices',
          fix: 'Add mobile-first responsive design patterns'
        });
      }

    } catch (error) {
      issues.push({
        type: 'error',
        category: 'smb-patterns',
        file: 'component-templates.mdc',
        description: 'Cannot validate SMB patterns - templates file missing',
        businessImpact: 'No SMB-specific guidance available',
        fix: 'Create component templates with SMB patterns'
      });
    }

    return issues;
  }

  private calculateBusinessScore(issues: BusinessIssue[]): number {
    let score = 100;

    for (const issue of issues) {
      switch (issue.type) {
        case 'error':
          score -= 20;
          break;
        case 'warning':
          score -= 10;
          break;
        case 'info':
          score -= 5;
          break;
      }
    }

    return Math.max(0, score);
  }

  private generateBusinessRecommendations(issues: BusinessIssue[]): string[] {
    const recommendations: string[] = [];

    const categories = issues.reduce((acc, issue) => {
      acc[issue.category] = (acc[issue.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    if (categories['data-integration'] > 0) {
      recommendations.push('🔗 Strengthen business data integration patterns and examples');
    }

    if (categories['customer-focus'] > 0) {
      recommendations.push('👥 Add more customer-focused context to rules');
    }

    if (categories['industry-bloat'] > 0) {
      recommendations.push('🧹 Remove industry-specific examples, use generic business patterns');
    }

    if (categories['smb-patterns'] > 0) {
      recommendations.push('🏪 Add more SMB-specific component templates and patterns');
    }

    if (issues.length === 0) {
      recommendations.push('🎉 Business alignment looks excellent! Rules are SMB-ready');
    }

    return recommendations;
  }

  private assessSMBReadiness(score: number, issues: BusinessIssue[]): 'excellent' | 'good' | 'needs-work' | 'poor' {
    const errorCount = issues.filter(i => i.type === 'error').length;
    
    if (errorCount > 0) return 'poor';
    if (score >= 90) return 'excellent';
    if (score >= 75) return 'good';
    return 'needs-work';
  }

  private async getRuleFiles(): Promise<string[]> {
    const files = await fs.readdir(this.rulesDir);
    return files.filter(file => file.endsWith('.mdc'));
  }

  async printResults(result: BusinessValidationResult): Promise<void> {
    console.log('\n' + '='.repeat(60));
    console.log('🏢 BUSINESS VALIDATION RESULTS');
    console.log('='.repeat(60));

    console.log(`\n📊 Business Score: ${result.businessScore}/100`);
    console.log(`🏪 SMB Readiness: ${result.smbReadiness.toUpperCase()}`);
    console.log(`✅ Status: ${result.success ? 'BUSINESS-READY' : 'NEEDS BUSINESS ALIGNMENT'}`);

    if (result.issues.length > 0) {
      const errorCount = result.issues.filter(i => i.type === 'error').length;
      const warningCount = result.issues.filter(i => i.type === 'warning').length;
      
      console.log(`\n📋 Issues Found: ${result.issues.length} (${errorCount} errors, ${warningCount} warnings)`);

      // Group by category
      const categories = result.issues.reduce((acc, issue) => {
        if (!acc[issue.category]) acc[issue.category] = [];
        acc[issue.category].push(issue);
        return acc;
      }, {} as Record<string, BusinessIssue[]>);

      for (const [category, categoryIssues] of Object.entries(categories)) {
        console.log(`\n📂 ${category.toUpperCase().replace('-', ' ')}:`);
        categoryIssues.forEach((issue, i) => {
          const icon = issue.type === 'error' ? '🚨' : issue.type === 'warning' ? '⚠️' : 'ℹ️';
          console.log(`  ${icon} ${issue.description}`);
          console.log(`     Impact: ${issue.businessImpact}`);
          console.log(`     Fix: ${issue.fix}`);
        });
      }
    }

    if (result.recommendations.length > 0) {
      console.log('\n💡 BUSINESS RECOMMENDATIONS:');
      result.recommendations.forEach((rec, i) => {
        console.log(`  ${i + 1}. ${rec}`);
      });
    }

    console.log('\n' + '='.repeat(60));
  }
}

async function main() {
  const validator = new BusinessValidator();
  const result = await validator.validateBusinessAlignment();
  await validator.printResults(result);
  
  process.exit(result.success ? 0 : 1);
}

if (require.main === module) {
  main().catch(console.error);
}

export { BusinessValidator }; 