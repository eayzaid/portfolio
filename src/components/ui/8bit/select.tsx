import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import './retro-select.css';

export interface SelectProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root> {}

export const Select: React.FC<SelectProps> = ({ children, ...props }) => {
  return <SelectPrimitive.Root {...props}>{children}</SelectPrimitive.Root>;
};

export interface SelectTriggerProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {
  className?: string;
}

export const SelectTrigger = React.forwardRef<
  HTMLButtonElement,
  SelectTriggerProps
>(({ className = '', children, ...props }, ref) => {
  return (
    <SelectPrimitive.Trigger
      ref={ref}
      className={`fp-8bit-select-trigger ${className}`.trim()}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <span className="fp-8bit-select-icon" aria-hidden="true">
          ▼
        </span>
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
});
SelectTrigger.displayName = 'SelectTrigger';

export interface SelectValueProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Value> {
  className?: string;
}

export const SelectValue = React.forwardRef<
  HTMLSpanElement,
  SelectValueProps
>(({ className = '', ...props }, ref) => {
  return (
    <span ref={ref} className={`fp-8bit-select-value ${className}`.trim()}>
      <SelectPrimitive.Value {...props} />
    </span>
  );
});
SelectValue.displayName = 'SelectValue';

export interface SelectContentProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> {
  className?: string;
}

export const SelectContent = React.forwardRef<
  HTMLDivElement,
  SelectContentProps
>(({ className = '', children, position = 'popper', ...props }, ref) => {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        position={position}
        sideOffset={4}
        className={`fp-8bit-select-content ${className}`.trim()}
        {...props}
      >
        <SelectPrimitive.Viewport className="fp-8bit-select-viewport">
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
});
SelectContent.displayName = 'SelectContent';

export interface SelectItemProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> {
  className?: string;
}

export const SelectItem = React.forwardRef<
  HTMLDivElement,
  SelectItemProps
>(({ className = '', children, ...props }, ref) => {
  return (
    <SelectPrimitive.Item
      ref={ref}
      className={`fp-8bit-select-item ${className}`.trim()}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="fp-8bit-select-indicator">
        ▶
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
});
SelectItem.displayName = 'SelectItem';

export const SelectGroup = SelectPrimitive.Group;
export const SelectLabel = SelectPrimitive.Label;
export const SelectSeparator = SelectPrimitive.Separator;
